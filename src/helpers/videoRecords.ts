import * as _ from 'index';

// Save videos from all pages in context
export const saveContextVideos = async (
  context: _.BrowserContext,
  videoDir: string,
  testName: string,
  runDateTime: string
): Promise<void> => {
  const pages = context.pages();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    // Skip if page is closed
    if (page.isClosed()) {
      continue;
    }

    const video = page.video();

    if (video) {
      try {
        // Create dynamic filename
        const sanitizedTestName = _.sanitizeTestName(testName);
        const videoFileName = pages.length > 1
          ? `${sanitizedTestName}_${runDateTime}_page${i + 1}.webm`
          : `${sanitizedTestName}_${runDateTime}.webm`;

        const videoPath = _.path.join(videoDir, videoFileName);

        // Save video to custom path
        await video.saveAs(videoPath);

      } catch (error) {
        console.error(`\n❌ Error saving video for page ${i + 1}:`, error);
      }
    }
  }
};
