import * as _ from '@Index';
import { Download } from '@playwright/test';

export class Downloadings {
  readonly page: _.Page;
  readonly downloadPromise: Promise<Download>;

  constructor(page: _.Page, downloadPromise: Promise<Download>) {
    this.page = page;
    this.downloadPromise = downloadPromise;
  }

  async Downloadings() {
    const download = await this.downloadPromise;

    if (process.env.DOWNLOAD_URL !== 'No') {
      const folder = process.env.DOWNLOAD_URL ?? "./DownloadedFiles";
      const filePath = _.path.join(folder, download.suggestedFilename());
      await download.saveAs(filePath);
    }
  }
}
