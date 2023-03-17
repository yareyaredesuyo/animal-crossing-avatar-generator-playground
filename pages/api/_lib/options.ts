import chrome from "chrome-aws-lambda";
const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
import chromium from "chrome-aws-lambda";
interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
  ignoreHTTPSErrors: boolean;
}

export async function getOption(isDev: boolean) {
  const executablePath = await chromium.executablePath;
  if (isDev) {
    return {
      args: [],
      executablePath: exePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
  return {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
    ignoreHTTPSErrors: true,
  };
}
