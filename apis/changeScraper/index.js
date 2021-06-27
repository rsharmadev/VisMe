const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const cors = require('cors')
const cheerio = require('cheerio');
const got = require('got');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

router.get('/', cors(), async (request, response) => {
    let res = await getPetitions();
    response.send(res)
});

router.post('/autofill', async (request, response) => {
    console.log("test")
    var autofiller = new autofill(request.body.link, request.body.firstName, request.body.lastName, request.body.email)
    autofiller.init()
});


app.use("/", router);

async function getPetitions() {
    const response = await got(`https://www.change.org/petitions?selected=popular_weekly`, {
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        }
    });
    const $ = cheerio.load(response.body);
    var list = [];
    $('a[class="link-block border-rounded hide-overflow bg-brighter mbl"]').each(function(i, selector) {
        let link = (`https://change.org${$(selector).attr("href")}`)
        list.push(link)
    });
    
    let fullList = [];
    for (var i = 0; i < list.length; i++) {
        const response = await got(list[i], {
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            }
        });
        const $ = cheerio.load(response.body);
        let petition = {
            "link": list[i],
            "title": $('h1[class="mtl mbxxxl xs-mts xs-mbxs petition-title"]').text(),
            "text": $('div[class="mbl type-break-word type-l rte"]').text(),
        }
        fullList.push(petition);
    }
    return fullList;
}

app.listen(4000,() => {
    console.log("Started on PORT 4000");
})

class autofill {
    constructor(url, firstName, lastName, email) {
        puppeteer.use(StealthPlugin())
        this.url = url;
        this.profile = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
        };
        this.errorCounter = 0;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: false,
        })
        this.page = await this.browser.newPage();
        await this.page.goto(this.url);
        return this.fillPetitionPage()
    }

    async fillPetitionPage() {
        try {
            await this.page.waitFor(2000)
            this.page.waitForSelector('input[id="firstName"]')
            await this.page.click('input[id="firstName"]')
            await this.page.type('input[id="firstName"]', this.profile.firstName, {delay: 0})
            await this.page.click('input[id="lastName"]')
            await this.page.type('input[id="lastName"]', this.profile.lastName, {delay: 0})
            await this.page.click('input[id="email"]')
            await this.page.type('input[id="email"]', this.profile.email, {delay: 0})
            await this.page.click('button[type="submit"]')
            return this.finalize()
        } catch (e) {
            if (this.errorCounter > 5) {
                this.errorCounter = this.errorCounter + 1;
                return this.fillPetitionPage()
            } else {
                await this.browser.close()
                return;
            }
        }
    }

    async finalize() {
        try {
            await this.page.waitFor(15000)
            await this.page.goto(`${this.url.split('?')[0]}/f?source_location=psf_petitions`);
            await this.page.waitFor(2000)
            await this.browser.close()
        } catch (e) {
            if (this.errorCounter > 5) {
                this.errorCounter = this.errorCounter + 1;
                return this.finalize()
            } else {
                await this.browser.close()
                return;
            }
        }
    }
}