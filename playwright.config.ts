import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command: "npm run dev:api",
      reuseExistingServer: true,
      url: "http://127.0.0.1:8787/api/health",
      timeout: 120_000,
    },
    {
      command: "npm run dev:ui -- --port 5173",
      reuseExistingServer: true,
      url: "http://127.0.0.1:5173",
      timeout: 120_000,
    },
  ],
  projects: [
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 960 } },
    },
    {
      name: "tablet",
      use: {
        browserName: "chromium",
        hasTouch: true,
        viewport: { width: 834, height: 1112 },
      },
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        hasTouch: true,
        isMobile: true,
        viewport: { width: 390, height: 844 },
      },
    },
  ],
});
