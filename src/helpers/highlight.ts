// import { Locator, Page } from '@playwright/test';

// type HighlightOptions = {
//   color?: string;
//   durationMs?: number;
//   overlay?: boolean;
//   glow?: boolean;
// };

// export async function highlight(
//   page: Page,
//   locator: Locator,
//   options: HighlightOptions = {}
// ) {
//   const {
//     color = '#ff0000',
//     durationMs = 800,
//     overlay = true,
//     glow = true,
//   } = options;

//   // Make sure element exists
//   await locator.waitFor({ state: 'attached' });

//   // Inject CSS only once
//   await page.evaluate(() => {
//     if (window.__pwHighlightInstalled) return;

//     const style = document.createElement('style');
//     style.id = '__pwHighlightStyle';
//     style.textContent = `
//       @keyframes pwPulse {
//         0%   { transform: scale(1); }
//         50%  { transform: scale(1.03); }
//         100% { transform: scale(1); }
//       }

//       #__pwHighlightOverlay {
//         position: fixed;
//         z-index: 999999;
//         pointer-events: none;
//         border-radius: 12px;
//         transition: all 0.12s ease-in-out;
//       }
//     `;
//     document.head.appendChild(style);

//     const overlay = document.createElement('div');
//     overlay.id = '__pwHighlightOverlay';
//     overlay.style.display = 'none';
//     document.body.appendChild(overlay);

//     window.__pwHighlightInstalled = true;
//   });

//   const handle = await locator.elementHandle();
//   if (!handle) return;

//   const box = await locator.boundingBox();
//   if (!box) return;

//   // Apply highlight (ONE time only)
//   await page.evaluate(
//     ({ element, box, color, overlay, glow }) => {
//       const el = element as HTMLElement;

//       // Store previous styles once
//       if (!(el as any).__pwPrevStyle) {
//         (el as any).__pwPrevStyle = {
//           outline: el.style.outline,
//           boxShadow: el.style.boxShadow,
//           borderRadius: el.style.borderRadius,
//           transition: el.style.transition,
//           animation: el.style.animation,
//         };
//       }

//       // Glow effect on element
//       if (glow) {
//         el.style.outline = `3px solid ${color}`;
//         el.style.boxShadow = `0 0 18px ${color}, 0 0 35px ${color}`;
//         el.style.borderRadius = '5px';
//         el.style.padding = '2px';
//         el.style.transition = 'all 0.2s ease-in-out';
//         el.style.animation = 'pwPulse 0.6s ease-in-out infinite';
//       }

//       // Overlay box (separate from element)
//       const overlayDiv = document.getElementById('__pwHighlightOverlay') as HTMLDivElement;

//       if (overlay && overlayDiv) {
//         overlayDiv.style.display = 'block';
//         overlayDiv.style.left = `${box.x}px`;
//         overlayDiv.style.top = `${box.y}px`;
//         overlayDiv.style.width = `${box.width}px`;
//         overlayDiv.style.height = `${box.height}px`;
//         overlayDiv.style.border = `3px solid ${color}`;
//         overlayDiv.style.boxShadow = `0 0 20px ${color}`;
//       } else if (overlayDiv) {
//         overlayDiv.style.display = 'none';
//       }
//     },
//     {
//       element: handle,
//       box,
//       color,
//       overlay,
//       glow,
//     }
//   );

//   await page.waitForTimeout(durationMs);

//   // Cleanup (remove highlight but keep overlay reusable)
//   await page.evaluate(
//     ({ element }) => {
//       const el = element as HTMLElement;
//       const prev = (el as any).__pwPrevStyle;

//       if (prev) {
//         el.style.outline = prev.outline || '';
//         el.style.boxShadow = prev.boxShadow || '';
//         el.style.borderRadius = prev.borderRadius || '';
//         el.style.transition = prev.transition || '';
//         el.style.animation = prev.animation || '';
//         delete (el as any).__pwPrevStyle;
//       }

//       const overlayDiv = document.getElementById('__pwHighlightOverlay') as HTMLDivElement;
//       if (overlayDiv) overlayDiv.style.display = 'none';
//     },
//     { element: handle }
//   );
// }

// // Needed so TS doesn't complain about custom window property
// declare global {
//   interface Window {
//     __pwHighlightInstalled?: boolean;
//   }
// }

// // ___
// export type HighlightConfig = {
//   enabled?: boolean;
//   color?: string;
//   durationMs?: number;
//   overlay?: boolean;
//   glow?: boolean;
// };


// // export function createhighLightLocator(
// //   locator: Locator,
// //   page: Page,
// //   config: HighlightConfig = {}
// // ) {

// export function createhighLightLocator(
//   locator: Locator,
//   page: Page,
//   config: HighlightConfig = {}
// ) {
//   const {
//     enabled = true,
//     color = '#ff0000',
//     durationMs = process.env.HIGHLIGHT_DURATION
//       ? parseInt(process.env.HIGHLIGHT_DURATION)
//       : 100,
//     overlay = parseInt(process.env.HIGHLIGHT_DURATION!) === 0 ? false : true,
//     glow = parseInt(process.env.HIGHLIGHT_DURATION!) === 0 ? false : true,
//   } = config;

//   const highlightOptions = { color, durationMs, overlay, glow };

//   // Methods to intercept
//   const interactionMethods = [
//     'click',
//     'dblClick',
//     'fill',
//     'type',
//     'press',
//     'check',
//     'uncheck',
//     'selectOption',
//     'scrollIntoViewIfNeeded',
//     'tap',
//     'focus',
//     'blur',
//     'hover',
//     'dragTo',
//     'textContent'
//   ];

//   // Patch each interaction method directly on the locator
//   //   interactionMethods.forEach((method) => {
//   //     const original = (locator as any)[method];
//   //     if (typeof original === 'function') {
//   //       (locator as any)[method] = async function (...args: any[]) {
//   //         if (enabled) {
//   //           try {
//   //             await highlight(page, locator, highlightOptions);
//   //           } catch (e) {
//   //             // Silently ignore highlight errors - don't block interaction
//   //           }
//   //         }
//   //         return await original.apply(this, args);
//   //       };
//   //     }
//   //   });

//   //   return locator;
//   // }

//   interactionMethods.forEach((method) => {
//     const original = (locator as any)[method];
//     if (typeof original === 'function') {
//       (locator as any)[method] = async function (...args: any[]) {
//         if (enabled) {
//           try {
//             await highlight(page, locator, highlightOptions);
//           } catch {
//             // ignore highlight errors
//           }
//         }
//         try {
//           return await original.apply(locator, args);
//         } catch (err) {
//           const message =
//             err instanceof Error ? err.message : String(err);
//           throw new Error(`[highlight] ${method} failed: ${message}`);
//         }
//       };
//     }
//   });

//   return locator;
// }

// /**
//  * Wraps page.locator() to auto-highlight all interactions
//  */
// // export function createhighLightPage(
// //   page: Page,
// //   config: HighlightConfig = {}
// // ) {
// //   const originalLocator = page.locator.bind(page);

// //   // Override page.locator method
// //   (page as any).locator = function (selector: string) {
// //     const locator = originalLocator(selector);
// //     return createhighLightLocator(locator, page, config);
// //   };

// //   return page;
// // }

// export function createhighLightPage(
//   page: Page,
//   config: HighlightConfig = {}
// ) {
//   const originalLocator = page.locator.bind(page);

//   // Override page.locator method (preserve full signature)
//   (page as any).locator = function (...args: Parameters<Page['locator']>) {
//     const locator = originalLocator(...args);
//     return createhighLightLocator(locator, page, config);
//   };

//   return page;
// }



// //-------------------------------


import { Locator, Page } from '@playwright/test';

type HighlightOptions = {
  color?: string;
  durationMs?: number;
  overlay?: boolean;
  glow?: boolean;
};

export async function highlight(
  page: Page,
  locator: Locator,
  options: HighlightOptions = {}
) {
  const {
    color = '#ff0000',
    durationMs = 800,
    overlay = true,
    glow = true,
  } = options;

  // Make sure element exists
  await locator.waitFor({ state: 'attached' });

  // Inject CSS only once
  await page.evaluate(() => {
    if (window.__pwHighlightInstalled) return;

    const style = document.createElement('style');
    style.id = '__pwHighlightStyle';
    style.textContent = `
      @keyframes pwPulse {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.03); }
        100% { transform: scale(1); }
      }

      #__pwHighlightOverlay {
        position: fixed;
        z-index: 999999;
        pointer-events: none;
        border-radius: 12px;
        transition: all 0.12s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = '__pwHighlightOverlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    window.__pwHighlightInstalled = true;
  });

  const handle = await locator.elementHandle();
  if (!handle) return;

  const box = await locator.boundingBox();
  if (!box) return;

  // Apply highlight (ONE time only)
  await page.evaluate(
    ({ element, box, color, overlay, glow }) => {
      const el = element as HTMLElement;

      // Store previous styles once
      if (!(el as any).__pwPrevStyle) {
        (el as any).__pwPrevStyle = {
          outline: el.style.outline,
          boxShadow: el.style.boxShadow,
          borderRadius: el.style.borderRadius,
          transition: el.style.transition,
          animation: el.style.animation,
        };
      }

      // Glow effect on element
      if (glow) {
        el.style.outline = `3px solid ${color}`;
        el.style.boxShadow = `0 0 18px ${color}, 0 0 35px ${color}`;
        el.style.borderRadius = '5px';
        el.style.padding = '2px';
        el.style.transition = 'all 0.2s ease-in-out';
        el.style.animation = 'pwPulse 0.6s ease-in-out infinite';
      }

      // Overlay box (separate from element)
      const overlayDiv = document.getElementById('__pwHighlightOverlay') as HTMLDivElement;

      if (overlay && overlayDiv) {
        overlayDiv.style.display = 'block';
        overlayDiv.style.left = `${box.x}px`;
        overlayDiv.style.top = `${box.y}px`;
        overlayDiv.style.width = `${box.width}px`;
        overlayDiv.style.height = `${box.height}px`;
        overlayDiv.style.border = `3px solid ${color}`;
        overlayDiv.style.boxShadow = `0 0 20px ${color}`;
      } else if (overlayDiv) {
        overlayDiv.style.display = 'none';
      }
    },
    {
      element: handle,
      box,
      color,
      overlay,
      glow,
    }
  );

  await page.waitForTimeout(durationMs);

  // Cleanup (remove highlight but keep overlay reusable)
  await page.evaluate(
    ({ element }) => {
      const el = element as HTMLElement;
      const prev = (el as any).__pwPrevStyle;

      if (prev) {
        el.style.outline = prev.outline || '';
        el.style.boxShadow = prev.boxShadow || '';
        el.style.borderRadius = prev.borderRadius || '';
        el.style.transition = prev.transition || '';
        el.style.animation = prev.animation || '';
        delete (el as any).__pwPrevStyle;
      }

      const overlayDiv = document.getElementById('__pwHighlightOverlay') as HTMLDivElement;
      if (overlayDiv) overlayDiv.style.display = 'none';
    },
    { element: handle }
  );
}

// Needed so TS doesn't complain about custom window property
declare global {
  interface Window {
    __pwHighlightInstalled?: boolean;
  }
}

// ___
export type HighlightConfig = {
  enabled?: boolean;
  color?: string;
  durationMs?: number;
  overlay?: boolean;
  glow?: boolean;
};


export function createhighLightLocator(
  locator: Locator,
  page: Page,
  config: HighlightConfig = {}
) {
  const {
    enabled = true,
    color = '#ff0000',
    durationMs = process.env.HIGHLIGHT_DURATION
      ? parseInt(process.env.HIGHLIGHT_DURATION)
      : 100,
    overlay = parseInt(process.env.HIGHLIGHT_DURATION!) === 0 ? false : true,
    glow = parseInt(process.env.HIGHLIGHT_DURATION!) === 0 ? false : true,
  } = config;

  const highlightOptions = { color, durationMs, overlay, glow };

  // Methods to intercept
  const interactionMethods = [
    'click',
    'dblClick',
    'fill',
    'type',
    'press',
    'check',
    'uncheck',
    'selectOption',
    'scrollIntoViewIfNeeded',
    'tap',
    'focus',
    'blur',
    'hover',
    'dragTo',
    'textContent'
  ];

  interactionMethods.forEach((method) => {
    const original = (locator as any)[method];
    if (typeof original === 'function') {
      (locator as any)[method] = async function (...args: any[]) {
        if (enabled) {
          try {
            await highlight(page, locator, highlightOptions);
          } catch {
            // Silently ignore highlight errors - don't block interaction
          }
        }
        // Execute original method and let any errors bubble up unchanged
        return await original.apply(locator, args);
      };
    }
  });

  return locator;
}

/**
 * Wraps page.locator() to auto-highlight all interactions
 */
export function createhighLightPage(
  page: Page,
  config: HighlightConfig = {}
) {
  const originalLocator = page.locator.bind(page);

  // Override page.locator method (preserve full signature)
  (page as any).locator = function (...args: Parameters<Page['locator']>) {
    const locator = originalLocator(...args);
    return createhighLightLocator(locator, page, config);
  };

  return page;
}
