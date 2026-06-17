import { describe, expect, test } from "vitest";
import { app } from "./app";

describe("CrisisCoord seeded backend API", () => {
  test("serves health status without API keys", async () => {
    const response = await app.request("/api/health");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true, service: "crisiscoord-api", mode: "seeded" });
  });

  test("serves multiple incident scenarios", async () => {
    const response = await app.request("/api/incidents");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.incidents).toHaveLength(5);
    expect(body.incidents.map((incident: { id: string }) => incident.id)).toEqual(
      expect.arrayContaining([
        "vendor-credential-compromise",
        "ransomware-containment",
        "health-privacy-review",
        "product-recall-safety",
        "payment-data-exposure",
      ]),
    );
    expect(body.incidents.map((incident: { sandboxId: string }) => incident.sandboxId)).toEqual(
      expect.arrayContaining([
        "third-party-risk",
        "cyber-resilience",
        "health-privacy",
        "product-supply-chain",
        "finance-payments",
      ]),
    );
  });

  test("serves grouped sandbox scenarios for testing and demos", async () => {
    const response = await app.request("/api/sandboxes");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.sandboxes).toHaveLength(5);
    expect(body.sandboxes.map((sandbox: { id: string }) => sandbox.id)).toEqual(
      expect.arrayContaining([
        "third-party-risk",
        "cyber-resilience",
        "health-privacy",
        "product-supply-chain",
        "finance-payments",
      ]),
    );

    for (const sandbox of body.sandboxes as Array<{ incidents: unknown[] }>) {
      expect(sandbox.incidents.length).toBeGreaterThan(0);
    }
  });

  test("serves workspace data for a selected incident id", async () => {
    const response = await app.request("/api/incidents/ransomware-containment/workspace");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.activeIncidentId).toBe("ransomware-containment");
    expect(body.pages.find((page: { id: string }) => page.id === "command").href).toBe(
      "/incidents/ransomware-containment",
    );
    expect(JSON.stringify(body.pages)).toContain("Ransomware containment event");
  });

  test("returns a 404 for unknown incident detail routes", async () => {
    const response = await app.request("/api/incidents/not-real");
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toMatchObject({
      error: "Incident not found",
      fallbackIncidentId: "vendor-credential-compromise",
    });
  });
});
