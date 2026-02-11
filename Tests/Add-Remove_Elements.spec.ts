import * as _ from '@Index';
import { AddRemoveEle } from '@Add-Remove_Elements.page';

_.test.describe('AddRemove_Element @ui', () => {
    _.test('Add and Remove Element', async ({ page }) => {

        const basePage = new _.BasePage(page);
        const addRemoveEle = new AddRemoveEle(page);

        await basePage.goToUrl();
        await addRemoveEle.ClickAddRemoveEleLink();
        await addRemoveEle.ClickAddElementButton();
        await addRemoveEle.ClickDeleteButton();
    });
});