import { createWorkspacePayload, defaultIncidentId, type WorkspacePayload } from "./data";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

export async function fetchWorkspacePayload(
  incidentId = defaultIncidentId,
  signal?: AbortSignal,
): Promise<WorkspacePayload> {
  const response = await fetch(
    `${apiBaseUrl}/api/workspace?incidentId=${encodeURIComponent(incidentId)}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Workspace API returned ${response.status}`);
  }

  return (await response.json()) as WorkspacePayload;
}

export function fallbackWorkspacePayload(incidentId = defaultIncidentId) {
  return createWorkspacePayload(incidentId);
}
