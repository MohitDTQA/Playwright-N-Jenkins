import * as _ from '@Index';
import { StatusCode } from '@StatusCode.page';

_.test('Status Code', async ({ page }) => {
    const basePage = new _.BasePage(page);
    const statusCode = new StatusCode(page);

    await basePage.goToUrl();
    await statusCode.ClickstatusCodeLink();
    await statusCode.ClickCode200Text();
    await statusCode.GetStatusCode(200);
    await page.goBack();
    await statusCode.ClickCode301Text();
    await statusCode.GetStatusCode(300);
    await page.goBack();
    await statusCode.ClickCode404Text();
    await statusCode.GetStatusCode(404);
    await page.goBack();
    await statusCode.ClickCode500Text();
    await statusCode.GetStatusCode(500);
})