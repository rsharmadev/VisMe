const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');
const got = require('got');

puppeteer.use(StealthPlugin()); // you're welcome matthew

let page;

class Change {
    constructor(info, petition, page) {
        this.info = info;
        this.list = [];
        this.link = `https://change.org${$(selector).attr("href")}`;
        this.petition = null;
        this.page = page;
        this.$ = null;
        this.response = null;
    }

    async getPetitions() {
        this.response = await got(`https://www.change.org/petitions?selected=popular_weekly`, {
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            }
        });
        parsePetitions();
    }
    
    async parsePetitions() {
        this.$ = cheerio.load(this.response);
        this.$('a[class="link-block border-rounded hide-overflow bg-brighter mbl"]').each(function(i, selector) {
            this.list.push(this.link)
        });
        console.log(this.list);
    }

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async signPetition() {
        await this.page.goto(this.petition);
        await sleep(5000);
        // let addressBtn = await page.$x('//*[@id="page"]/div[2]/div[3]/div[2]/div/div/div/div[2]/div[2]/form/button[1]/div/div');
        // addressBtn[0].click();
        for(const [key, value] of Object.entries(this.info)) {
            await sleep(500);
            await this.page.type(`#${key}`, value, {delay: 20});
        }
        await this.page.waitForSelector('.')
    
        // await page.$eval('.btn btn-big btn-full btn-action pvs', btn => btn.click());
        // await page.type('#city', info['city'], {delay: 20});
        // await page.type('#postalCode', info['postalCode'], {delay: 20});
        // await page.select('#stateCode', info['state'], {delay: 30});
        // await submitBtn[0].click();
    
    }
    
}


async function start() {
    const browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    let Task = new Change(info, 'https://www.change.org/p/paypal-paypal-to-pakistan-667560e3-b437-4635-adef-06ba08cc1a3e?source_location=petitions_browse', page);
    Task.signPetition()
}







let info = {
    firstName: 'Rohit',
    lastName: 'Sharma',
    email: 'kprsharma21@gmail.com',

}

start();