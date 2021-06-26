const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');
const got = require('got');

async function getPetitions() {
    const response = await got(`https://www.change.org/petitions?selected=popular_weekly`, {
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        }
    });
    parsePetitions(response.body);
}

async function parsePetitions(response) {
    const $ = cheerio.load(response);
    var list = [];
    $('a[class="link-block border-rounded hide-overflow bg-brighter mbl"]').each(function(i, selector) {
        let link = (`https://change.org${$(selector).attr("href")}`)
        list.push(link)
    });
    console.log(list);
}

getPetitions()