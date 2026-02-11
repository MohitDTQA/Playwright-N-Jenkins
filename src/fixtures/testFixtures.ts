import { test as base } from '@playwright/test';
import * as _ from '@Index';

// Override the default test with our custom fixtures
export const test = base.extend<{
  testDirectories: _.TestDirectories;
  page: _.EnhancedPage;
}>({
  // Fixture: Create and manage test directories
  testDirectories: async ({ browserName }, use, testInfo) => {
    const testName = testInfo.title;
    const runDateTime = _.getFormattedDateTime();
    const { videoDir, screenshotDir } = _.createArtifactDirectories(
      testName,
      browserName,
      runDateTime
    );

    // await use({ videoDir, screenshotDir, runDateTime });
    await use({ videoDir, screenshotDir, runDateTime });
  },

  // Fixture: Create browser context with video recording
  context: async ({ browser, testDirectories }, use, testInfo) => {
    // Create context with conditional video recording based on RECORD_VIDEO env var
    const recordVideo = process.env.RECORD_VIDEO === 'on' ? {
      dir: testDirectories.videoDir,
      size: { width: 1920, height: 1080 }
    } : undefined;

    const isHeaded = process.env.OPEN_BROWSER === 'true';
    const context = await browser.newContext({
      recordVideo: recordVideo,
      viewport: isHeaded ? null : { width: 1920, height: 1080 },
      // viewport: {width: 1920, height: 1080}
    });

    await use(context);

    // Close context - this automatically finalizes and saves all videos
    await context.close();

    // console.log(process.env.RECORD_VIDEO === 'on' ? `\n📹 Videos saved to: ${testDirectories.videoDir}\n` : `Video was not Recorded`);
  },

  // Fixture: Create enhanced page with custom functionality
  page: async ({ context, testDirectories, browserName }, use, testInfo) => {
    const testName = testInfo.title;
    const displayDateTime = _.getDisplayDateTime();

    // Create the page
    const page = await context.newPage();

    // Check if video is being recorded
    const video = page.video();
    console.log('📹 Video recording:', video ? 'STARTED' : 'NOT STARTED');

    // Show intro splash screen
    await _.showIntroSplash(page, testName, browserName, displayDateTime);

    // Add screenshot helper method to page
    const enhancedPage = page as _.EnhancedPage;
    enhancedPage.captureScreenshot = async (customName?: string) => {
      return await _.captureScreenshot(page, testDirectories.screenshotDir, customName);
    };

    // Enable auto-highlighting on all locator interactions
    const { createhighLightPage } = require('@Helper/highlight');
    createhighLightPage(enhancedPage, { enabled: true });

    await use(enhancedPage);
  }
});

export { expect } from '@playwright/test';
