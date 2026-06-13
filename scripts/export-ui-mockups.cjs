#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

const root = process.cwd();
const mockupDir = path.join(root, "docs/design/mockups");
const htmlPath = path.join(mockupDir, "index.html");
const screenshotDir = path.join(mockupDir, "screenshots");

const frames = [
  "color-system",
  "signals",
  "incidents",
  "command-room",
  "communications",
  "decision-desk",
  "audit",
  "settings",
];

async function main() {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing mockup board: ${htmlPath}`);
  }

  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1 });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });

  for (const frame of frames) {
    const locator = page.locator(`#${frame}`);
    await locator.waitFor({ state: "visible", timeout: 10_000 });
    await locator.screenshot({ path: path.join(screenshotDir, `${frame}.png`) });
  }

  await browser.close();
  console.log(`Exported ${frames.length} UI mockup screenshots to ${path.relative(root, screenshotDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
