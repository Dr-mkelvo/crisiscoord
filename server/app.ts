import { Hono } from "hono";
import {
  createWorkspacePayload,
  defaultIncidentId,
  getIncidentById,
  getIncidentsBySandbox,
  seededIncidents,
  sandboxProfiles,
} from "../src/data";

export const app = new Hono();

app.get("/api/health", (context) =>
  context.json({
    ok: true,
    service: "crisiscoord-api",
    mode: "seeded",
  }),
);

app.get("/api/incidents", (context) =>
  context.json({
    incidents: seededIncidents.map((incident) => ({
      id: incident.id,
      sandboxId: incident.sandboxId,
      title: incident.title,
      shortTitle: incident.shortTitle,
      type: incident.type,
      severity: incident.severity,
      tone: incident.tone,
      phase: incident.phase,
      owner: incident.owner,
      deadline: incident.deadline,
      summary: incident.summary,
    })),
  }),
);

app.get("/api/sandboxes", (context) =>
  context.json({
    sandboxes: sandboxProfiles.map((sandbox) => ({
      ...sandbox,
      incidents: getIncidentsBySandbox(sandbox.id).map((incident) => ({
        id: incident.id,
        title: incident.title,
        shortTitle: incident.shortTitle,
        severity: incident.severity,
        phase: incident.phase,
        deadline: incident.deadline,
      })),
    })),
  }),
);

app.get("/api/incidents/:incidentId", (context) => {
  const requestedId = context.req.param("incidentId");
  const incident = getIncidentById(requestedId);

  if (incident.id !== requestedId) {
    return context.json({ error: "Incident not found", fallbackIncidentId: incident.id }, 404);
  }

  return context.json({ incident });
});

app.get("/api/workspace", (context) => {
  const requestedId = context.req.query("incidentId") ?? defaultIncidentId;
  return context.json(createWorkspacePayload(requestedId));
});

app.get("/api/incidents/:incidentId/workspace", (context) => {
  const requestedId = context.req.param("incidentId");
  const incident = getIncidentById(requestedId);

  if (incident.id !== requestedId) {
    return context.json({ error: "Incident not found", fallbackIncidentId: incident.id }, 404);
  }

  return context.json(createWorkspacePayload(requestedId));
});

export default app;
