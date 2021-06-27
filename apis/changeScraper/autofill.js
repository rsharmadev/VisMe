const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');

class autofill {
    constructor(url, profile) {
        puppeteer.use(StealthPlugin())
        this.url = url;
        this.profile = profile;
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

let profile = {
    "firstName": "Matthew",
    "lastName": "Nanas",
    "email": "spazeplayz@gmail.com"
}

var autofiller = new autofill("https://change.org/p/paypal-paypal-to-pakistan-667560e3-b437-4635-adef-06ba08cc1a3e?source_location=petitions_browse", profile)
autofiller.init()