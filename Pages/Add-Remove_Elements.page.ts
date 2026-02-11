import * as _ from 'index';

export class AddRemoveEle {
    readonly page: _.Page;
    readonly AddRemoveEleLink: _.Locator;
    readonly AddElementButton: _.Locator;
    readonly DeleteButton: _.Locator;

    constructor(page: _.Page) {
        this.page = page;
        //locators
        this.AddRemoveEleLink = page.locator("//a[text()='Add/Remove Elements']");
        this.AddElementButton = page.locator("//button[text()='Add Element']");
        this.DeleteButton = page.locator("(//button[text()='Delete'])[last()]");
    }

    //methods
    async ClickAddRemoveEleLink() {
        await this.AddRemoveEleLink.click();
    }

    async ClickAddElementButton() {
        for (var i = 0; i < 2; i++) {
            await this.AddElementButton.click();
        }
    }

    async ClickDeleteButton() {
        await this.DeleteButton.click();
    }
}