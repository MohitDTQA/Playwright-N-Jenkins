// import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// const configenv = dotenv.config({ path: 'config.env', quiet: true, });
// const credsenv = dotenv.config({ path: 'creds.env', quiet: true, });

// export { configenv, credsenv };
export { Page, Locator, BrowserContext, APIRequestContext, APIResponse } from '@playwright/test';
export { test, expect } from '@Fixtures/testFixtures';
export { path };
export { fs };
export type { EnhancedPage, TestDirectories } from '@Types/testTypes';

// Export utilities if needed in tests
export { getFormattedDateTime, getDisplayDateTime } from '@Utils/dateTime';
export { sanitizeTestName } from '@Utils/stringUtils';
export { createArtifactDirectories } from '@Utils/directoryUtils';
export { captureScreenshot } from '@Helper/screenShots';
export { showIntroSplash } from '@Helper/splashScreen';
export { highlight, createhighLightLocator, createhighLightPage } from '@Helper/highlight';
export { BasePage } from '@BasePage';
export { useData } from '@TestData/TestData';

// API
export { Api, CheckStatus } from '@api_Helpers/api';
export { generateRandomUser } from '@api_Helpers/RandomUser';
