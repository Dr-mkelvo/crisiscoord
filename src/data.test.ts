import { describe, expect, test } from "vitest";
import {
  createWorkspacePayload,
  getIncidentsBySandbox,
  sandboxProfiles,
  seededIncidents,
} from "./data";

describe("sandbox scenario dataset", () => {
  test("has unique sandbox profiles with at least one scenario each", () => {
    expect(new Set(sandboxProfiles.map((sandbox) => sandbox.id)).size).toBe(
      sandboxProfiles.length,
    );

    for (const sandbox of sandboxProfiles) {
      expect(sandbox.label).toBeTruthy();
      expect(sandbox.domain).toBeTruthy();
      expect(getIncidentsBySandbox(sandbox.id).length).toBeGreaterThan(0);
    }
  });

  test("has complete unique seeded incidents", () => {
    expect(new Set(seededIncidents.map((incident) => incident.id)).size).toBe(
      seededIncidents.length,
    );

    for (const incident of seededIncidents) {
      expect(incident.id).toMatch(/^inc-\d{4}-\d{4}$/);
      expect(incident.id).not.toMatch(/credential|ransomware|privacy|recall|payment|breach/);
      expect(incident.title).toBeTruthy();
      expect(incident.shortTitle).toBeTruthy();
      expect(incident.summary).toBeTruthy();
      expect(incident.deadlineHours).toBeGreaterThan(0);
      expect(incident.clockStartedMinutesAgo).toBeGreaterThanOrEqual(0);
      expect(incident.clockStartedMinutesAgo).toBeLessThan(incident.deadlineHours * 60);
      expect(incident.affectedSystems.length).toBeGreaterThan(0);
      expect(incident.dataCategories.length).toBeGreaterThan(0);
    }
  });

  test("creates a complete workspace payload for every scenario", () => {
    for (const incident of seededIncidents) {
      const payload = createWorkspacePayload(incident.id);

      expect(payload.activeIncidentId).toBe(incident.id);
      expect(payload.incidents).toHaveLength(seededIncidents.length);
      expect(payload.pages.map((page) => page.id)).toEqual([
        "signals",
        "incidents",
        "command",
        "communications",
        "decisions",
        "audit",
        "settings",
      ]);
      expect(payload.pages.map((page) => page.href)).toEqual([
        "/signals",
        "/incidents",
        "/command",
        "/communications",
        "/decisions",
        "/audit",
        "/settings",
      ]);
      expect(payload.pages.every((page) => page.tabs.length === 4)).toBe(true);

      for (const page of payload.pages) {
        expect(page.routeLabel.startsWith("/")).toBe(false);
        expect(page.routeLabel).not.toContain(":incidentId");
      }
    }
  });

  test("keeps repeated UI data from duplicating labels within a tab", () => {
    for (const incident of seededIncidents) {
      const payload = createWorkspacePayload(incident.id);

      for (const page of payload.pages) {
        for (const tab of page.tabs) {
          const metricLabels = tab.metrics.map((metric) => metric.label);
          const cardTitles = tab.cards.map((card) => card.title);

          expect(new Set(metricLabels).size).toBe(metricLabels.length);
          expect(new Set(cardTitles).size).toBe(cardTitles.length);
        }
      }
    }
  });
});
