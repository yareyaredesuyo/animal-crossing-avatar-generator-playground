import core from 'puppeteer-core';
import { getOption } from './options';
import chromium from 'chrome-aws-lambda';

let _page: core.Page | null;

type FileType = 'png' | 'jpeg';

async function getBrowserInstance() {
    const executablePath = await chromium.executablePath;
  
    const option = await getOption(!executablePath);
    if (!executablePath) {
      // running locally
      return core.launch(option);
    }

    return chromium.puppeteer.launch(option);
  }

async function getPage() {
    if (_page) {
        return _page;
    }
    // const options = await getOptions();
    const browser = await getBrowserInstance();
    // return await browser.newPage();
    // const browser = await core.launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, type: FileType = "png") {
    const page = await getPage();
    await page.setViewport({ width: 1200, height: 628 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}