const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const cors = require('cors')
const cheerio = require('cheerio');
const got = require('got');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

router.get('/', cors(), async (request, response) => {
    let res = await getPetitions();
    response.send(res)
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
            //"thumbnail": $('img[class="sc-fzpmMD fPcnhl"]').attr("src"),
        }
        fullList.push(petition);
    }
    return fullList;
}

app.listen(4000,() => {
    console.log("Started on PORT 4000");
})