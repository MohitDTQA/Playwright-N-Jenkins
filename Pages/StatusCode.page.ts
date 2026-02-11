import * as _ from '@Index';

export class StatusCode {
    readonly page: _.Page;
    readonly statusCodeLink: _.Locator;
    readonly Code200Text: _.Locator;
    readonly Code301Text: _.Locator;
    readonly Code404Text: _.Locator;
    readonly Code500Text: _.Locator;


    constructor(page: _.Page) {
        this.page = page;
        this.statusCodeLink = page.locator("//a[text()='Status Codes']");
        this.Code200Text = page.locator("//a[text()='200']");
        this.Code301Text = page.locator("//a[text()='301']");
        this.Code404Text = page.locator("//a[text()='404']");
        this.Code500Text = page.locator("//a[text()='500']");

    }

    async ClickstatusCodeLink() {
        await this.statusCodeLink.scrollIntoViewIfNeeded();
        await this.statusCodeLink.click();
    }

    async GetStatusCode(StatusCode: Number) {
        const url = this.page.url();
        const responseCode = await this.page.goto(url);

        if (StatusCode === (responseCode?.status())) {
            console.log(`\nStatus Code: ${responseCode?.status()}`);
        }
        else {
            console.warn(`\nInvalid Status code: ${responseCode?.status() + ' ≠ ' + StatusCode}`)
        }
    }

    async ClickCode200Text() {
        await this.Code200Text.click();
    }

    async ClickCode301Text() {
        await this.Code301Text.click();
    }

    async ClickCode404Text() {
        await this.Code404Text.click();
    }

    async ClickCode500Text() {
        await this.Code500Text.click();
    }


}