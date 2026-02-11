import * as _ from '@Index';

// Create custom directories for artifacts with unique run folder
export const createArtifactDirectories = (
  testName: string,
  browserName: string,
  runDateTime: string
): {
  baseDir: string;
  videoDir: string;
  screenshotDir: string;
} => {
  const sanitizedTestName = _.sanitizeTestName(testName);
  const sanitizedBrowserName = _.sanitizeTestName(browserName);

  // Create unique run folder with format- dateTime_testName_browserName
  const runFolder = `${runDateTime}_${sanitizedTestName}_${sanitizedBrowserName}`;
  const baseDir = _.path.join(process.cwd(), 'artifacts', runFolder);
  const videoDir = _.path.join(baseDir, 'videos');
  const screenshotDir = _.path.join(baseDir, 'screenshots');

  // Create directories if they don't exist
  if (!_.fs.existsSync(baseDir)) {
    _.fs.mkdirSync(baseDir, { recursive: true });
  }
  if (!_.fs.existsSync(videoDir)) {
    _.fs.mkdirSync(videoDir, { recursive: true });
  }
  if (!_.fs.existsSync(screenshotDir)) {
    _.fs.mkdirSync(screenshotDir, { recursive: true });
  }

  return { baseDir, videoDir, screenshotDir };
};