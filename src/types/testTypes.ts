import * as _ from '@Index';

// Custom page type with screenshot helper
export type EnhancedPage = _.Page & {
  captureScreenshot: (customName?: string) => Promise<string | null>;
};

// Shared test directories fixture
export type TestDirectories = {
  videoDir: string;
  screenshotDir: string;
  runDateTime: string;
};