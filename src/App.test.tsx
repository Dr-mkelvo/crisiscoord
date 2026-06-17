import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import {
  App,
  createInitialTabs,
  normalizePath,
  resolveWorkspacePage,
} from "./App";
import {
  auditHref,
  commandHref,
  communicationsHref,
  createWorkspacePayload,
  defaultIncidentId,
  getIncidentAuditHref,
  getIncidentCommandHref,
  getIncidentCommunicationsHref,
  pages,
  type WorkspacePage,
} from "./data";

function renderAt(pathname: string, workspacePages?: WorkspacePage[]) {
  window.history.replaceState(null, "", pathname);
  return render(<App workspacePages={workspacePages} />);
}

function getSelectedTab(name: string) {
  return screen.getByRole("tab", { name });
}

describe("CrisisCoord app routing and workspace data", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", commandHref);
  });

  test("normalizes the root route to the command room", () => {
    expect(normalizePath("/")).toBe(commandHref);
    expect(commandHref).toBe(`/incidents/${defaultIncidentId}`);
    expect(normalizePath("/incidents/payment-breach")).toBe(commandHref);
    expect(normalizePath("/incidents/vendor-credential-compromise/audit")).toBe(
      "/incidents/inc-2026-0001/audit",
    );
    expect(resolveWorkspacePage("/").id).toBe("command");
    expect(resolveWorkspacePage("/decisions", []).id).toBe("command");
  });

  test("creates a first-tab selection map for backend-provided pages", () => {
    expect(createInitialTabs(pages)).toMatchObject({
      signals: "Signals",
      incidents: "Queue",
      command: "Overview",
      communications: "Drafts",
      decisions: "Pending",
      audit: "Timeline",
      settings: "Providers",
    });
  });

  test("renders the decision desk route with its default tab", () => {
    renderAt("/decisions");

    expect(screen.getAllByRole("heading", { name: "Decision Desk" }).length).toBeGreaterThan(0);
    expect(screen.queryByText(/CrisisCoord \//)).not.toBeInTheDocument();
    expect(getSelectedTab("Pending")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Pending decisions")).toBeInTheDocument();
    expect(screen.getByText("Notification Center")).toBeInTheDocument();
  });

  test("switches tabs inside a workspace without changing the page count", async () => {
    const user = userEvent.setup();
    renderAt("/decisions");

    await user.click(getSelectedTab("Escalations"));

    expect(getSelectedTab("Escalations")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Escalation ladder")).toBeInTheDocument();
    expect(screen.getByText("Why escalation happened")).toBeInTheDocument();
  });

  test("navigates from command room action to the email composer tab", async () => {
    const user = userEvent.setup();
    const incidentId = "inc-2026-0002";
    const payload = createWorkspacePayload(incidentId);
    renderAt(getIncidentCommandHref(incidentId), payload.pages);

    await user.click(screen.getByRole("button", { name: "Open email draft" }));

    expect(window.location.pathname).toBe(getIncidentCommunicationsHref(incidentId));
    expect(getSelectedTab("Email")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Email composer")).toBeInTheDocument();
    expect(screen.getByText("safe email composer")).toBeInTheDocument();
  });

  test("navigates from a decision fact request to the audit evidence tab", async () => {
    const user = userEvent.setup();
    renderAt("/decisions");

    await user.click(screen.getByRole("button", { name: "Request facts" }));

    expect(window.location.pathname).toBe(auditHref);
    expect(getSelectedTab("Evidence")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Evidence detail")).toBeInTheDocument();
  });

  test("records a visible result when reviewing a signal", async () => {
    const user = userEvent.setup();
    renderAt("/signals");

    await user.click(screen.getByRole("button", { name: "Review signal" }));

    expect(screen.getByRole("heading", { name: "Signal reviewed" })).toBeInTheDocument();
    expect(screen.getAllByText("Signal Intake / Signals").length).toBeGreaterThan(0);
  });

  test("queues a communication package and records the delivery event", async () => {
    const user = userEvent.setup();
    const incidentId = "inc-2026-0001";
    const payload = createWorkspacePayload(incidentId);
    renderAt(getIncidentCommunicationsHref(incidentId), payload.pages);

    await user.click(getSelectedTab("Email"));
    await user.click(screen.getByRole("button", { name: "Queue package" }));

    expect(getSelectedTab("Delivery Log")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "Communication package queued" })).toBeInTheDocument();
    expect(screen.getAllByText("delivery log updated").length).toBeGreaterThan(0);
  });

  test("records escalation and backup notification events", async () => {
    const user = userEvent.setup();
    renderAt("/decisions");

    await user.click(screen.getByRole("button", { name: "Escalate" }));

    expect(getSelectedTab("Escalations")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "Escalation package created" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Notify backup" }));

    expect(screen.getByRole("heading", { name: "Backup owner notified" })).toBeInTheDocument();
    expect(screen.getAllByText("notification logged").length).toBeGreaterThan(0);
  });

  test("keeps audit and communications URLs tied to the selected incident", () => {
    expect(getIncidentCommandHref("inc-2026-0004")).toBe(
      "/incidents/inc-2026-0004",
    );
    expect(getIncidentCommunicationsHref("inc-2026-0004")).toBe(
      "/incidents/inc-2026-0004/communications",
    );
    expect(getIncidentAuditHref("inc-2026-0004")).toBe(
      "/incidents/inc-2026-0004/audit",
    );
    expect(getIncidentCommandHref("product-recall-safety")).toBe("/incidents/inc-2026-0004");
    expect(communicationsHref).not.toContain("payment-breach");
    expect(communicationsHref).not.toContain("vendor-credential-compromise");
  });

  test("renders human page labels instead of raw route labels", () => {
    const incidentId = "inc-2026-0004";
    const payload = createWorkspacePayload(incidentId);

    renderAt(getIncidentCommandHref(incidentId), payload.pages);

    expect(screen.getByText("Command room")).toBeInTheDocument();
    expect(screen.queryByText(getIncidentCommandHref(incidentId))).not.toBeInTheDocument();
    expect(screen.queryByText("/incidents/:incidentId")).not.toBeInTheDocument();
  });

  test("renders supplied workspace data so the backend can replace seeded data later", () => {
    const backendPages = pages.map((page) =>
      page.id === "decisions"
        ? {
            ...page,
            title: "Backend Decision Desk",
            subtitle: "Loaded from a backend-shaped workspace payload.",
            tabs: [
              {
                ...page.tabs[0],
                title: "Backend pending decisions",
                mainTitle: "Backend decision card",
              },
              ...page.tabs.slice(1),
            ],
          }
        : page,
    );

    renderAt("/decisions", backendPages);

    expect(screen.getAllByRole("heading", { name: "Backend Decision Desk" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Loaded from a backend-shaped workspace payload.")).toBeInTheDocument();
    expect(screen.getByText("Backend decision card")).toBeInTheDocument();
  });
});
