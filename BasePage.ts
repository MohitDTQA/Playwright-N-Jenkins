import * as _ from '@Index';

export class BasePage {
    readonly page: _.Page;

    constructor(page: _.Page) {
        this.page = page;
    }

    async goToUrl() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async goToApiUrl(){
        await this.page.goto(process.env.API_URL!);
    }

}
