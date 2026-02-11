import * as _ from 'index';

// Show fullscreen intro splash
export const showIntroSplash = async (
  page: _.Page,
  testName: string,
  browserName: string,
  dateTime: string,
  // durationMs = parseInt(process.env.SPLASH_DURATION!)
): Promise<void> => {
  await page.goto('about:blank');

  const durationMs = process.env.SPLASH_DURATION
    ? parseInt(process.env.SPLASH_DURATION, 10)
    : 500;
  const durationSeconds = Math.max(0, Math.round(durationMs / 1000));

  await page.evaluate(({ testName, browserName, dateTime, durationSeconds }) => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    const splash = document.createElement('div');
    splash.id = 'intro-splash';
    splash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: black;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    splash.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <div style="font-size: 28px; font-weight: 300; margin-bottom: 40px; opacity: 1.0;">
          ${dateTime}
        </div>
        <div style="font-size: 56px; font-weight: bold; margin-bottom: 30px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
          ${testName}
        </div>
        <div style="font-size: 36px; font-weight: 500; opacity: 0.95; margin-top: 20px;">
          Browser: ${browserName}
        </div>
      </div>
    `;

    document.body.appendChild(splash);
  }, { testName, browserName, dateTime, durationSeconds });

  // Wait for splash screen to be visible
  if (durationMs > 0) {
    await page.waitForTimeout(durationMs);
  }

  // ? Remove splash after duration
  await page.evaluate(() => {
    document.getElementById('intro-splash')?.remove();
  });
};
