import * as _ from '@Index';

// Take screenshot with page title and timestamp
export const captureScreenshot = async (
  page: _.Page,
  screenshotDir: string,
  customName?: string,
  fullPage = false
): Promise<string | null> => {
  try {
    const pageTitle = await page.title();
    const sanitizedTitle = _.sanitizeTestName(pageTitle || 'untitled');
    const dateTime = _.getFormattedDateTime();
    const fileName = customName
      ? `${_.sanitizeTestName(customName)}_${dateTime}.png`
      : `${sanitizedTitle}_${dateTime}.png`;
    const screenshotPath = _.path.join(screenshotDir, fileName);

    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    return screenshotPath;
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
    return null;
  }
};