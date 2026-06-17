import { expect, test } from "@playwright/test";

const routes = [
  { path: "/signals", heading: "Signal Intake And Sandbox Launcher" },
  { path: "/incidents", heading: "Incident Registry" },
  { path: "/incidents/vendor-credential-compromise", heading: "Crisis Command Room" },
  {
    path: "/incidents/ransomware-containment/communications",
    heading: "Communications Review",
  },
  { path: "/decisions", heading: "Decision Desk" },
  { path: "/incidents/health-privacy-review/audit", heading: "Evidence And Audit" },
  { path: "/settings", heading: "Integrations And Demo Readiness" },
];

async function expectNoDocumentOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => {
    return Math.max(
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
      document.body.scrollWidth - document.body.clientWidth,
    );
  });
  expect(overflow).toBeLessThanOrEqual(4);
}

test.describe("responsive workspace shell", () => {
  for (const route of routes) {
    test(`renders ${route.heading}`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page.getByRole("heading", { name: route.heading }).first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Workspaces" })).toBeVisible();
      await expect(page.getByRole("tablist")).toBeVisible();
      await expect(page.getByText("Notification Center")).toBeVisible();
      await expectNoDocumentOverflow(page);
    });
  }

  test("keeps decision tabs and action routing usable", async ({ page }) => {
    await page.goto("/decisions");

    await page.getByRole("tab", { name: "Escalations" }).click();
    await expect(page.getByRole("tab", { name: "Escalations" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Why escalation happened" })).toBeVisible();

    await page.getByRole("button", { name: "Open email" }).click();
    await expect(page).toHaveURL(/\/incidents\/vendor-credential-compromise\/communications$/);
    await expect(page.getByRole("tab", { name: "Email" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Email composer" })).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("shows command-room handoff and opens communication composer", async ({ page }) => {
    await page.goto("/incidents/product-recall-safety");

    await expect(page.getByLabel("Band mediated handoff map")).toBeVisible();
    await expect(page.getByText("Communications unlocks after Legal and Technical")).toBeVisible();

    await page.getByRole("button", { name: "Open email draft" }).click();
    await expect(page).toHaveURL(/\/incidents\/product-recall-safety\/communications$/);
    await expect(page.getByRole("tab", { name: "Email" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByText("safe email composer")).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("redirects the old payment-breach URL to the generic active incident", async ({ page }) => {
    await page.goto("/incidents/payment-breach");

    await expect(page).toHaveURL(/\/incidents\/vendor-credential-compromise$/);
    await expect(page.getByText("Vendor credential compromise")).toBeVisible();
  });
});
