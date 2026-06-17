import { expect, test } from "@playwright/test";

const routes = [
  { path: "/signals", heading: "Signal Intake And Sandbox Launcher", navLabel: "Signal Intake" },
  { path: "/incidents", heading: "Incident Registry", navLabel: "Incident Registry" },
  { path: "/command", heading: "Crisis Command Room", navLabel: "Command Room" },
  { path: "/communications", heading: "Communications Review", navLabel: "Communications" },
  { path: "/decisions", heading: "Decision Desk", navLabel: "Decision Desk" },
  { path: "/audit", heading: "Evidence And Audit", navLabel: "Evidence And Audit" },
  { path: "/settings", heading: "Integrations And Operations", navLabel: "Integrations" },
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
      await expect(page.getByText(/CrisisCoord \//)).toHaveCount(0);
      expect(page.url()).not.toMatch(/vendor|credential|ransomware|privacy|recall|payment|breach/);
      const routePillText = await page.locator(".route-pill").textContent();
      expect(routePillText?.startsWith("/")).toBe(false);
      expect(routePillText).not.toContain(":incidentId");
      await expect(page.getByRole("navigation", { name: "Workspaces" })).toBeVisible();
      await expect(page.getByRole("tablist")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Action Trail" })).toBeVisible();
      await expect(page.getByRole("link", { name: route.navLabel })).toBeVisible();
      await expectNoDocumentOverflow(page);
    });
  }

  test("global search opens relevant workspace tabs", async ({ page }) => {
    await page.goto("/command");

    await page.getByRole("textbox", { name: "Search incidents, evidence, owners" }).fill("sms");
    await page.getByRole("button", { name: /Communications \/ SMS/ }).click();

    await expect(page).toHaveURL(/\/communications$/);
    await expect(page.getByRole("tab", { name: "SMS" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Search result opened" })).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("keeps decision tabs and action routing usable", async ({ page }) => {
    await page.goto("/decisions");

    await page.getByRole("tab", { name: "Escalations" }).click();
    await expect(page.getByRole("tab", { name: "Escalations" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Why escalation happened" })).toBeVisible();

    await page.getByRole("button", { name: "Open email" }).click();
    await expect(page).toHaveURL(/\/communications$/);
    await expect(page.getByRole("tab", { name: "Email" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Email composer", exact: true })).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("shows command-room handoff and opens communication composer", async ({ page }) => {
    await page.goto("/command");

    await expect(page.getByLabel("Band mediated handoff map")).toBeVisible();
    await expect(page.getByText("Communications unlocks after Legal and Technical")).toBeVisible();

    await page.getByRole("button", { name: "Open email draft" }).click();
    await expect(page).toHaveURL(/\/communications$/);
    await expect(page.getByRole("tab", { name: "Email" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByText("safe email composer")).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("turns action clicks into visible workflow events", async ({ page }) => {
    await page.goto("/signals");

    await page.getByRole("button", { name: "Review signal" }).click();
    await expect(page.getByRole("heading", { name: "Signal reviewed" })).toBeVisible();

    await page.goto("/communications");
    await page.getByRole("tab", { name: "Email" }).click();
    await page.getByRole("button", { name: "Queue package" }).click();
    await expect(page.getByRole("tab", { name: "Delivery Log" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Communication package queued" })).toBeVisible();

    await page.goto("/decisions");
    await page.getByRole("button", { name: "Escalate" }).click();
    await expect(page.getByRole("heading", { name: "Escalation package created" })).toBeVisible();
    await page.getByRole("button", { name: "Notify backup" }).click();
    await expect(page.getByRole("heading", { name: "Backup owner notified" })).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("opens notification setup from the top bar bell", async ({ page }) => {
    await page.goto("/command");

    await page.getByRole("button", { name: "Open notification channels" }).click();

    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.getByRole("heading", { name: "Integrations And Operations" }).first()).toBeVisible();
    await expect(page.getByRole("tab", { name: "Notification Channels" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Notification settings opened" })).toBeVisible();
    await expectNoDocumentOverflow(page);
  });

  test("redirects the old payment-breach URL to the generic active incident", async ({ page }) => {
    await page.goto("/incidents/payment-breach");

    await expect(page).toHaveURL(/\/command$/);
    await expect(page.getByText("Vendor credential compromise")).toBeVisible();
  });

  test("redirects old incident-scoped section URLs to clean workspace routes", async ({ page }) => {
    await page.goto("/incidents/vendor-credential-compromise/audit");

    await expect(page).toHaveURL(/\/audit$/);
    await expect(page.getByRole("heading", { name: "Evidence And Audit" }).first()).toBeVisible();
    expect(page.url()).not.toContain("vendor-credential-compromise");
    expect(page.url()).not.toContain("inc-2026");
    await expectNoDocumentOverflow(page);
  });

  test("shows deterministic live state instead of frozen deadline metrics", async ({ page }) => {
    await page.goto("/command");

    const deadlineCard = page.locator(".metric-card").filter({ hasText: "Next deadline" }).first();
    await expect(deadlineCard).toContainText(/\d+h \d+m \d+s/);
    const before = await deadlineCard.textContent();
    await page.waitForTimeout(1100);
    const after = await deadlineCard.textContent();
    expect(after).not.toEqual(before);
    await expectNoDocumentOverflow(page);
  });
});
