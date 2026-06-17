import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  ChevronRight,
  CircleDot,
  ClipboardList,
  FileCheck2,
  Gauge,
  Gavel,
  LockKeyhole,
  MessageSquareText,
  RadioTower,
  Search,
  Settings,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fallbackWorkspacePayload, fetchWorkspacePayload } from "./api";
import {
  defaultIncidentId,
  getCanonicalIncidentPath,
  getIncidentAuditHref,
  getIncidentCommandHref,
  getIncidentCommunicationsHref,
  getIncidentIdFromPath,
  type ActionKind,
  type DetailCard,
  type FeedItem,
  type IncidentSummary,
  type Metric,
  type PageAction,
  type PageTab,
  pages as defaultWorkspacePages,
  isLegacyIncidentPath,
  type Tone,
  type WorkspacePayload,
  type WorkspacePage,
} from "./data";

type TabState = Record<string, string>;
type WorkflowEvent = FeedItem & {
  id: string;
};

type SearchResult = {
  id: string;
  label: string;
  detail: string;
  href: string;
  pageId?: string;
  tabName?: string;
  tone: Tone;
};

type AppProps = {
  workspacePages?: WorkspacePage[];
  initialWorkspacePayload?: WorkspacePayload;
  loadWorkspaceData?: boolean;
};

const pageIcons: Record<string, typeof Activity> = {
  signals: RadioTower,
  incidents: ClipboardList,
  command: Siren,
  communications: MessageSquareText,
  decisions: Gavel,
  audit: FileCheck2,
  settings: Settings,
};

export function createInitialTabs(workspacePages: WorkspacePage[]) {
  return workspacePages.reduce<TabState>((state, page) => {
    state[page.id] = page.tabs[0]?.name ?? "";
    return state;
  }, {});
}

export function normalizePath(pathname: string) {
  if (pathname === "/") {
    return getIncidentCommandHref(defaultIncidentId);
  }
  if (isLegacyIncidentPath(pathname)) {
    return getCanonicalIncidentPath(pathname);
  }
  return getCanonicalIncidentPath(pathname);
}

function getPath() {
  return normalizePath(window.location.pathname);
}

function getFallbackPage(workspacePages: WorkspacePage[]) {
  return (
    workspacePages.find((page) => page.id === "command") ??
    defaultWorkspacePages.find((page) => page.id === "command") ??
    workspacePages[0] ??
    defaultWorkspacePages[0]
  );
}

export function resolveWorkspacePage(
  path: string,
  workspacePages: WorkspacePage[] = defaultWorkspacePages,
) {
  const fallbackPage = getFallbackPage(workspacePages);
  const exact = workspacePages.find((page) => page.href === path);
  if (exact) return exact;
  if (path.includes("/communications")) {
    return workspacePages.find((page) => page.id === "communications") ?? fallbackPage;
  }
  if (path.includes("/audit")) {
    return workspacePages.find((page) => page.id === "audit") ?? fallbackPage;
  }
  if (path.startsWith("/incidents/") && path !== "/incidents") {
    return workspacePages.find((page) => page.id === "command") ?? fallbackPage;
  }
  return fallbackPage;
}

function getRouteIncidentId(path: string, fallbackIncidentId = defaultIncidentId) {
  return getIncidentIdFromPath(path) ?? fallbackIncidentId;
}

function reconcileSelectedTabs(current: TabState, workspacePages: WorkspacePage[]) {
  const next = createInitialTabs(workspacePages);
  for (const page of workspacePages) {
    const selected = current[page.id];
    if (selected && page.tabs.some((tab) => tab.name === selected)) {
      next[page.id] = selected;
    }
  }
  return next;
}

function formatCountdown(remainingMs: number) {
  const safeMs = Math.max(0, remainingMs);
  const totalSeconds = Math.floor(safeMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

function getDeadlineTone(remainingMs: number): Tone {
  const remainingHours = remainingMs / (60 * 60 * 1000);
  if (remainingHours <= 0) return "danger";
  if (remainingHours <= 6) return "danger";
  if (remainingHours <= 24) return "warning";
  return "success";
}

function countEvents(events: WorkflowEvent[], pattern: RegExp) {
  return events.filter((event) => pattern.test(`${event.title} ${event.detail} ${event.meta}`))
    .length;
}

function createSearchResults(
  query: string,
  workspacePages: WorkspacePage[],
  incidents: IncidentSummary[],
) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const candidates: SearchResult[] = [];

  for (const page of workspacePages) {
    candidates.push({
      id: `page-${page.id}`,
      label: page.title,
      detail: `${page.navLabel}: ${page.subtitle}`,
      href: page.href,
      pageId: page.id,
      tabName: page.tabs[0]?.name,
      tone: page.tone,
    });

    for (const tab of page.tabs) {
      candidates.push({
        id: `tab-${page.id}-${tab.name}`,
        label: `${page.navLabel} / ${tab.name}`,
        detail: `${tab.title}. ${tab.summary}`,
        href: page.href,
        pageId: page.id,
        tabName: tab.name,
        tone: page.tone,
      });
    }
  }

  for (const incident of incidents) {
    candidates.push({
      id: `incident-${incident.id}`,
      label: incident.title,
      detail: `${incident.severity} ${incident.type}. Owner: ${incident.owner}. Phase: ${incident.phase}.`,
      href: getIncidentCommandHref(incident.id),
      pageId: "command",
      tabName: "Overview",
      tone: incident.tone,
    });
  }

  return candidates
    .filter((candidate) =>
      `${candidate.label} ${candidate.detail}`.toLowerCase().includes(normalizedQuery),
    )
    .slice(0, 6);
}

function createLiveMetrics({
  metrics,
  incident,
  workflowEvents,
  now,
  sessionClockStartedAt,
}: {
  metrics: Metric[];
  incident?: IncidentSummary;
  workflowEvents: WorkflowEvent[];
  now: number;
  sessionClockStartedAt: number;
}): Metric[] {
  if (!incident) return metrics;

  const elapsedDuringSessionMs = now - sessionClockStartedAt;
  const alreadyElapsedMs = incident.clockStartedMinutesAgo * 60 * 1000;
  const totalWindowMs = incident.deadlineHours * 60 * 60 * 1000;
  const remainingMs = totalWindowMs - alreadyElapsedMs - elapsedDuringSessionMs;
  const handoffEvents = countEvents(
    workflowEvents,
    /room|message|email|sms|package|signal|diagnostic|delivery/i,
  );
  const decisionEvents = countEvents(
    workflowEvents,
    /decision|escalation|backup|evidence request|owner|facts/i,
  );
  const evidenceEvents = countEvents(workflowEvents, /evidence|audit|export|package|queued/i);
  const queuedEvents = countEvents(workflowEvents, /queued|package|delivery/i);

  return metrics.map((metric) => {
    if (metric.label === "Next deadline") {
      return {
        ...metric,
        value: formatCountdown(remainingMs),
        detail: "live incident clock",
        tone: getDeadlineTone(remainingMs),
      };
    }

    if (metric.label === "Band handoffs") {
      return {
        ...metric,
        value: String(12 + handoffEvents),
        detail: `${5 + handoffEvents} room events verified`,
      };
    }

    if (metric.label === "Human decisions") {
      return {
        ...metric,
        value: String(3 + decisionEvents),
        detail: decisionEvents === 0 ? metric.detail : `${decisionEvents} action events added`,
      };
    }

    if (metric.label === "Evidence packets") {
      return {
        ...metric,
        value: String(9 + evidenceEvents),
        detail: evidenceEvents === 0 ? metric.detail : "updated by action trail",
      };
    }

    if (metric.label === "Queued") {
      return {
        ...metric,
        value: String(Number(metric.value) + queuedEvents),
        detail: queuedEvents === 0 ? metric.detail : "delivery action trail",
      };
    }

    return metric;
  });
}

export function App({
  workspacePages,
  initialWorkspacePayload,
  loadWorkspaceData,
}: AppProps) {
  const [path, setPath] = useState(getPath);
  const [sessionClockStartedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const shouldLoadWorkspaceData = loadWorkspaceData ?? !workspacePages;
  const [workspacePayload, setWorkspacePayload] = useState<WorkspacePayload>(() => {
    if (initialWorkspacePayload) return initialWorkspacePayload;
    return fallbackWorkspacePayload(getRouteIncidentId(window.location.pathname));
  });
  const activeWorkspacePages = workspacePages ?? workspacePayload.pages;
  const activeIncidentId = getRouteIncidentId(path, workspacePayload.activeIncidentId);
  const [selectedTabs, setSelectedTabs] = useState<TabState>(() =>
    createInitialTabs(activeWorkspacePages),
  );
  const [workflowEvents, setWorkflowEvents] = useState<WorkflowEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const normalizedPath = getPath();
    if (normalizedPath !== window.location.pathname) {
      window.history.replaceState(null, "", normalizedPath);
    }
    setPath(normalizedPath);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!shouldLoadWorkspaceData || workspacePages) return;

    const controller = new AbortController();
    fetchWorkspacePayload(activeIncidentId, controller.signal)
      .then((payload) => {
        setWorkspacePayload(payload);
      })
      .catch(() => {
        setWorkspacePayload(fallbackWorkspacePayload(activeIncidentId));
      });

    return () => controller.abort();
  }, [activeIncidentId, shouldLoadWorkspaceData, workspacePages]);

  useEffect(() => {
    setSelectedTabs((current) => reconcileSelectedTabs(current, activeWorkspacePages));
  }, [activeWorkspacePages]);

  const activePage = useMemo(
    () => resolveWorkspacePage(path, activeWorkspacePages),
    [path, activeWorkspacePages],
  );
  const activeTabName = selectedTabs[activePage.id] ?? activePage.tabs[0].name;
  const activeTab =
    activePage.tabs.find((tab) => tab.name === activeTabName) ?? activePage.tabs[0];
  const activeIncident = workspacePayload.incidents.find(
    (incident) => incident.id === activeIncidentId,
  );
  const searchResults = useMemo(
    () => createSearchResults(searchQuery, activeWorkspacePages, workspacePayload.incidents),
    [activeWorkspacePages, searchQuery, workspacePayload.incidents],
  );
  const liveMetrics = createLiveMetrics({
    metrics: activeTab.metrics,
    incident: activeIncident,
    workflowEvents,
    now,
    sessionClockStartedAt,
  });

  const navigate = (href: string) => {
    window.history.pushState(null, "", normalizePath(href));
    setPath(getPath());
  };

  const selectTab = (pageId: string, tabName: string) => {
    setSelectedTabs((current) => ({ ...current, [pageId]: tabName }));
  };

  const openSearchResult = (result: SearchResult) => {
    if (result.pageId && result.tabName) {
      selectTab(result.pageId, result.tabName);
    }
    navigate(result.href);
    setSearchQuery("");
    recordWorkflowEvent({
      title: "Search result opened",
      detail: `${result.label} opened from global search.`,
      meta: result.detail,
      tone: result.tone,
    });
  };

  const recordWorkflowEvent = (event: Omit<WorkflowEvent, "id">) => {
    setWorkflowEvents((current) => [
      { ...event, id: `${Date.now()}-${current.length}` },
      ...current,
    ].slice(0, 6));
  };

  const runAction = (action: PageAction) => {
    const setTabForPage = (pageId: string, tabName: string) => {
      setSelectedTabs((current) => ({ ...current, [pageId]: tabName }));
    };

    const commandHref = getIncidentCommandHref(activeIncidentId);
    const communicationsHref = getIncidentCommunicationsHref(activeIncidentId);
    const auditHref = getIncidentAuditHref(activeIncidentId);

    recordWorkflowEvent(createWorkflowEvent(action, activePage, activeTab, activeIncidentId));

    const handlers: Record<ActionKind, () => void> = {
      "navigate-command": () => navigate(commandHref),
      "navigate-communications": () => navigate(communicationsHref),
      "navigate-audit": () => navigate(auditHref),
      "tab-email": () => {
        setTabForPage("communications", "Email");
        navigate(communicationsHref);
      },
      "tab-sms": () => {
        setTabForPage("communications", "SMS");
        navigate(communicationsHref);
      },
      "tab-delivery": () => {
        setTabForPage("communications", "Delivery Log");
        navigate(communicationsHref);
      },
      "tab-messaging": () => {
        setTabForPage("command", "Messaging");
        navigate(commandHref);
      },
      "tab-evidence": () => {
        setTabForPage("audit", "Evidence");
        navigate(auditHref);
      },
      "tab-escalations": () => {
        setTabForPage("decisions", "Escalations");
        navigate("/decisions");
      },
    };

    const labelHandlers: Record<string, () => void> = {
      "Open registry": () => navigate("/incidents"),
      "Open exports": () => {
        setTabForPage("audit", "Exports");
        navigate(auditHref);
      },
      "Inspect reasoning": () => {
        setTabForPage("audit", "Agent Reasoning");
        navigate(auditHref);
      },
      "Open evidence": () => {
        setTabForPage("audit", "Evidence");
        navigate(auditHref);
      },
      "Export audit": () => {
        setTabForPage("audit", "Exports");
        navigate(auditHref);
      },
      "Notification setup": () => {
        setTabForPage("settings", "Notification Channels");
        navigate("/settings");
      },
      "Run policy check": () => {
        setTabForPage("settings", "Security Controls");
        navigate("/settings");
      },
      "Delivery log": () => {
        setTabForPage("communications", "Delivery Log");
        navigate(communicationsHref);
      },
    };

    if (action.kind) {
      handlers[action.kind]?.();
      return;
    }

    labelHandlers[action.label]?.();
  };

  const openNotificationSettings = () => {
    selectTab("settings", "Notification Channels");
    navigate("/settings");
    recordWorkflowEvent({
      title: "Notification settings opened",
      detail:
        "Channel setup is now visible for in-app, Band, email, SMS, and recipient policy review.",
      meta: "top bar",
      tone: "brand",
    });
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} navigate={navigate} workspacePages={activeWorkspacePages} />
      <main className="workspace">
        <TopBar
          activePage={activePage}
          notificationCount={Math.max(3, workflowEvents.length)}
          onOpenNotifications={openNotificationSettings}
          searchQuery={searchQuery}
          searchResults={searchResults}
          onSearchQueryChange={setSearchQuery}
          onOpenSearchResult={openSearchResult}
        />
        <Workspace
          activePage={activePage}
          activeTab={activeTab}
          metrics={liveMetrics}
          selectedTabName={activeTabName}
          selectTab={selectTab}
          runAction={runAction}
          workflowEvents={workflowEvents}
        />
      </main>
    </div>
  );
}

function createWorkflowEvent(
  action: PageAction,
  activePage: WorkspacePage,
  activeTab: PageTab,
  activeIncidentId: string,
): Omit<WorkflowEvent, "id"> {
  const baseMeta = `${activePage.navLabel} / ${activeTab.name}`;
  const actionEvents: Record<string, Omit<WorkflowEvent, "id">> = {
    "Review signal": {
      title: "Signal reviewed",
      detail:
        "The intake packet was marked safe for the incident run and is ready for agent launch.",
      meta: baseMeta,
      tone: "success",
    },
    "Validate packet": {
      title: "Prompt packet validated",
      detail:
        "Private fields stayed blocked and the agent-scoped prompt packet passed the safe-input gate.",
      meta: baseMeta,
      tone: "success",
    },
    "Launch room": {
      title: "Command room launched",
      detail:
        "Assessment can post context first, then Legal and Technical can work in parallel from the same room.",
      meta: `incident: ${activeIncidentId}`,
      tone: "success",
    },
    "Launch command room": {
      title: "Command room launched",
      detail:
        "A shared room state was created for agents, human decisions, notifications, and audit events.",
      meta: `incident: ${activeIncidentId}`,
      tone: "success",
    },
    "Open command room": {
      title: "Command room opened",
      detail:
        "The selected incident is now in the shared room where agent handoffs and human decisions are visible.",
      meta: `incident: ${activeIncidentId}`,
      tone: "brand",
    },
    "Open room": {
      title: "Command room opened",
      detail:
        "The selected incident is now in the shared room where agent handoffs and human decisions are visible.",
      meta: `incident: ${activeIncidentId}`,
      tone: "brand",
    },
    "Open registry": {
      title: "Incident registry opened",
      detail:
        "The operator can compare scenario severity, owners, phases, deadlines, and open actions.",
      meta: "registry",
      tone: "brand",
    },
    "Open messaging": {
      title: "Owner message thread opened",
      detail:
        "The in-app thread is the system of record before Band, email, or SMS adapters are used.",
      meta: "notification center",
      tone: "brand",
    },
    "Message owner": {
      title: "Owner message prepared",
      detail:
        "A structured request with the decision, risk, owner, and evidence links is ready in the command room.",
      meta: "human owner",
      tone: "review",
    },
    "Open decisions": {
      title: "Decision desk opened",
      detail:
        "The unresolved human decision is now visible with risk of approving, risk of waiting, and escalation path.",
      meta: "human-in-the-loop",
      tone: "review",
    },
    Escalate: {
      title: "Escalation package created",
      detail:
        "The primary owner path was marked unresolved and the backup owner receives the same decision packet.",
      meta: "backup owner ready",
      tone: "review",
    },
    "Notify backup": {
      title: "Backup owner notified",
      detail:
        "A simulated in-app and Band notification was recorded for the backup approver with evidence attached.",
      meta: "notification logged",
      tone: "review",
    },
    "Open email draft": {
      title: "Email draft opened",
      detail:
        "The communications agent can draft only from verified facts and visible missing-fact warnings.",
      meta: "communications gate",
      tone: "warning",
    },
    "Open decision desk": {
      title: "Decision desk opened",
      detail:
        "The unresolved human decision is now visible with risk of approving, risk of waiting, and escalation path.",
      meta: "human-in-the-loop",
      tone: "review",
    },
    "Open email": {
      title: "Email composer opened",
      detail:
        "The draft stays in safe mode with allowlisted recipients until human approval and provider setup exist.",
      meta: "safe email composer",
      tone: "brand",
    },
    "Open SMS": {
      title: "SMS composer opened",
      detail:
        "SMS is limited to internal owner acknowledgement in the MVP and remains simulated by default.",
      meta: "safe SMS composer",
      tone: "warning",
    },
    "Send test": {
      title: "Safe test email recorded",
      detail:
        "The app simulated an allowlisted internal email test and wrote the result to the incident trail.",
      meta: "no external send",
      tone: "success",
    },
    "Queue package": {
      title: "Communication package queued",
      detail:
        "The reviewed draft package moved to the delivery log with provider, owner, and audit metadata.",
      meta: "delivery log updated",
      tone: "success",
    },
    "Simulate SMS": {
      title: "SMS simulation recorded",
      detail:
        "The owner acknowledgement message was simulated and stored as a notification attempt.",
      meta: "internal escalation only",
      tone: "success",
    },
    "Request facts": {
      title: "Evidence request sent",
      detail:
        "The missing fact was routed to the technical or legal owner and linked to the audit trail.",
      meta: "evidence request",
      tone: "brand",
    },
    "Open audit": {
      title: "Audit trail opened",
      detail:
        "The operator can inspect source facts, human decisions, provider metadata, and notification attempts.",
      meta: "traceability",
      tone: "brand",
    },
    "Open exports": {
      title: "Audit exports opened",
      detail:
        "The export package shows what can be shared safely and what remains blocked.",
      meta: "redacted package",
      tone: "brand",
    },
    "Inspect reasoning": {
      title: "Reasoning packet opened",
      detail:
        "The UI shows inputs, structured outputs, confidence, unknowns, and source links without exposing private data.",
      meta: "agent audit",
      tone: "review",
    },
    "Open evidence": {
      title: "Evidence detail opened",
      detail:
        "Confirmed facts, assumptions, unknowns, and source references are separated before drafts use them.",
      meta: "source facts",
      tone: "brand",
    },
    "Export audit": {
      title: "Audit export prepared",
      detail:
        "A redacted review package was prepared for internal review with unsafe fields blocked.",
      meta: "export ready",
      tone: "success",
    },
    "Prepare export": {
      title: "Export package prepared",
      detail:
        "The export package now contains timeline, evidence, decisions, and communication states.",
      meta: "safe package",
      tone: "success",
    },
    "Run diagnostics": {
      title: "Provider diagnostics completed",
      detail:
        "Band, Supabase, model providers, notification adapters, and fallback controls were checked in safe mode.",
      meta: "system health",
      tone: "success",
    },
    "Notification setup": {
      title: "Notification setup opened",
      detail:
        "The operator can configure in-app, Band, email, SMS, allowlist, and live-send defaults.",
      meta: "channel setup",
      tone: "review",
    },
    "Delivery log": {
      title: "Delivery log opened",
      detail:
        "Queued, acknowledged, timed-out, and simulated notification attempts are visible in one ledger.",
      meta: "delivery audit",
      tone: "brand",
    },
    "Run policy check": {
      title: "Safety policy check passed",
      detail:
        "The app confirmed no secrets or real personal data should be shown in browser screenshots or prompts.",
      meta: "safe mode",
      tone: "success",
    },
  };

  return (
    actionEvents[action.label] ?? {
      title: `${action.label} recorded`,
      detail:
        "The action was recorded in the local event trail so the operator can see cause and effect.",
      meta: baseMeta,
      tone: action.tone,
    }
  );
}

function getActionEffect(action: PageAction) {
  const actionEffects: Record<string, string> = {
    "Review signal": "Marks this signal as reviewed and writes a visible intake event.",
    "Validate packet": "Checks the redaction gate before any agent prompt can use the packet.",
    "Launch room": "Opens the command room and starts the shared agent handoff flow.",
    "Launch command room": "Creates the shared crisis room for agent posts, decisions, and audit.",
    "Open command room": "Returns to the live room for the selected incident.",
    "Open room": "Returns to the live room without exposing incident IDs in the URL.",
    "Open registry": "Shows the incident queue with severity, phase, owner, and deadline.",
    "Open messaging": "Opens the in-app owner thread inside the command room.",
    "Message owner": "Prepares a structured request for the accountable human owner.",
    "Open decisions": "Opens the decision desk and escalation tab for human review.",
    "Open decision desk": "Opens the human decision desk for the active incident.",
    Escalate: "Creates an escalation packet and moves the decision to the escalation lane.",
    "Notify backup": "Records a backup-owner notification attempt in the action trail.",
    "Open email draft": "Opens the guarded email draft with missing-fact warnings.",
    "Open email": "Opens the email composer tab with allowlisted recipients only.",
    "Open SMS": "Opens the SMS composer tab for internal acknowledgement only.",
    "Send test": "Records a safe internal test send without external delivery.",
    "Queue package": "Moves the approved communication package into the delivery log.",
    "Simulate SMS": "Records a simulated SMS acknowledgement attempt.",
    "Request facts": "Routes missing facts to the evidence tab and audit trail.",
    "Open audit": "Opens the evidence and audit workspace for traceability.",
    "Open exports": "Opens redacted export packages for internal review.",
    "Inspect reasoning": "Opens agent inputs, outputs, unknowns, and provider metadata.",
    "Open evidence": "Opens confirmed facts, assumptions, unknowns, and source references.",
    "Export audit": "Prepares a redacted audit package for internal review.",
    "Prepare export": "Builds the review package from timeline, evidence, decisions, and communications.",
    "Run diagnostics": "Checks provider, notification, fallback, and safety-control status.",
    "Notification setup": "Opens channel policy for in-app, Band, email, SMS, and allowlists.",
    "Delivery log": "Opens queued, acknowledged, timed-out, and failed notification attempts.",
    "Run policy check": "Checks redaction, approval gates, hidden secrets, and live-send locks.",
  };

  if (actionEffects[action.label]) return actionEffects[action.label];
  if (action.kind?.startsWith("navigate")) return "Opens the relevant workspace and records the action.";
  if (action.kind?.startsWith("tab")) return "Switches to the relevant operational tab and records the action.";
  return "Records the action in the visible trail so the operator sees cause and effect.";
}

function Sidebar({
  activePage,
  navigate,
  workspacePages,
}: {
  activePage: WorkspacePage;
  navigate: (href: string) => void;
  workspacePages: WorkspacePage[];
}) {
  const commandPageHref =
    workspacePages.find((page) => page.id === "command")?.href ??
    getIncidentCommandHref(defaultIncidentId);

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <a className="brand-block" href={commandPageHref} onClick={(event) => {
        event.preventDefault();
        navigate(commandPageHref);
      }}>
        <span className="brand-mark">
          <ShieldCheck size={18} strokeWidth={2.4} />
        </span>
        <span>
          <strong>CrisisCoord</strong>
          <small>Enterprise response</small>
        </span>
      </a>

      <nav className="nav-group" aria-label="Workspaces">
        <span className="nav-label">Workspaces</span>
        {workspacePages.map((page) => {
          const Icon = pageIcons[page.id] ?? CircleDot;
          const isActive = page.id === activePage.id;
          return (
            <a
              key={page.id}
              className={isActive ? "nav-item active" : "nav-item"}
              href={page.href}
              aria-label={page.navLabel}
              onClick={(event) => {
                event.preventDefault();
                navigate(page.href);
              }}
            >
              <span className="nav-item-main">
                <Icon size={16} />
                <span>{page.navLabel}</span>
              </span>
              {isActive ? <ChevronRight size={15} /> : null}
            </a>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot success" aria-hidden="true" />
        <div>
          <strong>Source status</strong>
          <span>Live checks + fallback</span>
        </div>
      </div>
    </aside>
  );
}

function TopBar({
  activePage,
  notificationCount,
  onOpenNotifications,
  searchQuery,
  searchResults,
  onSearchQueryChange,
  onOpenSearchResult,
}: {
  activePage: WorkspacePage;
  notificationCount: number;
  onOpenNotifications: () => void;
  searchQuery: string;
  searchResults: SearchResult[];
  onSearchQueryChange: (query: string) => void;
  onOpenSearchResult: (result: SearchResult) => void;
}) {
  return (
    <header className="topbar">
      <div>
        <h1>{activePage.title}</h1>
      </div>
      <div className="topbar-actions">
        <div className="search-wrap">
          <label className="search-shell">
            <Search size={15} />
            <span className="sr-only">Search</span>
            <input
              aria-label="Search incidents, evidence, owners"
              onChange={(event) => onSearchQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && searchResults[0]) {
                  onOpenSearchResult(searchResults[0]);
                }
                if (event.key === "Escape") {
                  onSearchQueryChange("");
                }
              }}
              placeholder="Search incidents, evidence, owners"
              value={searchQuery}
            />
          </label>
          {searchQuery.trim() ? (
            <div className="search-results" role="listbox" aria-label="Search results">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="search-result"
                    onClick={() => onOpenSearchResult(result)}
                    type="button"
                  >
                    <span className={`status-dot ${result.tone}`} aria-hidden="true" />
                    <span>
                      <strong>{result.label}</strong>
                      <small>{result.detail}</small>
                    </span>
                  </button>
                ))
              ) : (
                <div className="search-empty">No matching incident, owner, tab, or evidence area.</div>
              )}
            </div>
          ) : null}
        </div>
        <Badge tone="info" label="Band active" />
        <Badge tone="success" label="Synthetic mode" />
        <button
          className="icon-button"
          aria-label="Open notification channels"
          onClick={onOpenNotifications}
          type="button"
        >
          <Bell size={18} />
          <span>{notificationCount}</span>
        </button>
      </div>
    </header>
  );
}

function Workspace({
  activePage,
  activeTab,
  metrics,
  selectedTabName,
  selectTab,
  runAction,
  workflowEvents,
}: {
  activePage: WorkspacePage;
  activeTab: PageTab;
  metrics: Metric[];
  selectedTabName: string;
  selectTab: (pageId: string, tabName: string) => void;
  runAction: (action: PageAction) => void;
  workflowEvents: WorkflowEvent[];
}) {
  return (
    <section className="page-surface" aria-labelledby="workspace-title">
      <div className="page-heading">
        <div>
          <div className="eyebrow-row">
            <span className={`route-pill tone-${activePage.tone}`}>{activePage.routeLabel}</span>
            <Badge tone={activePage.tone} label={activePage.activeBadge} />
          </div>
          <h2 id="workspace-title">{activePage.title}</h2>
          <p>{activePage.subtitle}</p>
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label={`${activePage.title} tabs`}>
        {activePage.tabs.map((tab) => (
          <button
            key={tab.name}
            className={tab.name === selectedTabName ? "tab active" : "tab"}
            role="tab"
            aria-selected={tab.name === selectedTabName}
            onClick={() => selectTab(activePage.id, tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <Metrics metrics={metrics} />

      <div className="content-grid">
        <FeedPanel title={activeTab.feedTitle} items={activeTab.feed} />
        <MainPanel tab={activeTab} pageId={activePage.id} />
        <ActionPanel tab={activeTab} runAction={runAction} workflowEvents={workflowEvents} />
      </div>
    </section>
  );
}

function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="metric-grid">
      {metrics.map((metric) => (
        <article className="metric-card" key={`${metric.label}-${metric.value}`}>
          <span className={`status-dot ${metric.tone}`} aria-hidden="true" />
          <small>{metric.label}</small>
          <strong>{metric.value}</strong>
          <span>{metric.detail}</span>
        </article>
      ))}
    </div>
  );
}

function FeedPanel({ title, items }: { title: string; items: FeedItem[] }) {
  return (
    <section className="panel feed-panel">
      <PanelHeader icon={Activity} title={title} subtitle="Source linked, confidence shown" />
      <div className="stack">
        {items.map((item) => (
          <FeedRow item={item} key={`${item.title}-${item.meta}`} />
        ))}
      </div>
    </section>
  );
}

function MainPanel({ tab, pageId }: { tab: PageTab; pageId: string }) {
  return (
    <section className="panel main-panel">
      <PanelHeader icon={Bot} title={tab.mainTitle} subtitle={tab.eyebrow} />
      <div className="main-summary">
        <h3>{tab.title}</h3>
        <p>{tab.summary}</p>
        <div className="summary-note">
          <span className="status-dot info" aria-hidden="true" />
          <span>{tab.mainSummary}</span>
        </div>
      </div>
      {pageId === "command" && tab.name === "Overview" ? <HandoffMap /> : null}
      <div className="detail-grid">
        {tab.cards.map((card) => (
          <DetailCardView card={card} key={`${card.title}-${card.meta}`} />
        ))}
      </div>
    </section>
  );
}

function ActionPanel({
  tab,
  runAction,
  workflowEvents,
}: {
  tab: PageTab;
  runAction: (action: PageAction) => void;
  workflowEvents: WorkflowEvent[];
}) {
  const latestEvent = workflowEvents[0];

  return (
    <aside className="right-rail">
      <section className="panel decision-card">
        <div className="decision-tag">
          <Users size={14} />
          <span>Operator step</span>
        </div>
        <h3>{tab.actionTitle}</h3>
        <p>{tab.actionSummary}</p>
        <div className="button-stack">
          {tab.actions.map((action) => (
            <div className="action-choice" key={action.label}>
              <button
                className={`button tone-${action.tone}`}
                onClick={() => runAction(action)}
                type="button"
              >
                {action.label}
              </button>
              <small>{getActionEffect(action)}</small>
            </div>
          ))}
        </div>
      </section>

      {latestEvent ? (
        <section className={`panel action-result tone-${latestEvent.tone}`} aria-live="polite">
          <div>
            <span className={`status-dot ${latestEvent.tone}`} aria-hidden="true" />
            <strong>Last action result</strong>
          </div>
          <h3>{latestEvent.title}</h3>
          <p>{latestEvent.detail}</p>
          <small>{latestEvent.meta}</small>
        </section>
      ) : null}

      <section className="panel">
        <PanelHeader
          icon={Gauge}
          title="Action Trail"
          subtitle="Every click records an operator-visible result"
        />
        <div className="stack">
          {workflowEvents.length === 0 ? (
            <FeedRow
              item={{
                title: "Ready for interaction",
                detail:
                  "Click an action to create a visible notification, delivery, escalation, search, or audit event.",
                meta: "event trail",
                tone: "info",
              }}
              compact
            />
          ) : null}
          {workflowEvents.slice(0, 3).map((event) => (
            <FeedRow item={event} key={event.id} compact />
          ))}
          {tab.status.map((item) => (
            <FeedRow item={item} key={`${item.title}-${item.meta}`} compact />
          ))}
        </div>
      </section>

      <section className="panel compact-card">
        <div>
          <LockKeyhole size={16} />
          <strong>Safety policy</strong>
        </div>
        <p>
          External sends require configured recipients, approval, audit records, and provider gates
          before live delivery is allowed.
        </p>
      </section>
    </aside>
  );
}

function PanelHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Activity;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="panel-header">
      <div>
        <span className="panel-icon">
          <Icon size={16} />
        </span>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </header>
  );
}

function FeedRow({
  item,
  compact = false,
}: {
  item: FeedItem;
  compact?: boolean;
}) {
  return (
    <article className={compact ? "feed-row compact" : "feed-row"}>
      <span className={`status-dot ${item.tone}`} aria-hidden="true" />
      <div>
        <strong>{item.title}</strong>
        <p>{item.detail}</p>
        <small>{item.meta}</small>
      </div>
    </article>
  );
}

function DetailCardView({ card }: { card: DetailCard }) {
  return (
    <article className={`detail-card tone-${card.tone}`}>
      <div>
        <Badge tone={card.tone} label={card.meta} />
      </div>
      <h4>{card.title}</h4>
      <p>{card.body}</p>
    </article>
  );
}

function Badge({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span className={`badge tone-${tone}`}>
      <span className={`status-dot ${tone}`} aria-hidden="true" />
      {label}
    </span>
  );
}

function HandoffMap() {
  const nodes = [
    { label: "Assessment", tone: "info", x: 8, y: 58 },
    { label: "Legal", tone: "warning", x: 38, y: 20 },
    { label: "Band", tone: "brand", x: 48, y: 52 },
    { label: "Technical", tone: "brand", x: 76, y: 30 },
    { label: "Communications", tone: "review", x: 76, y: 72 },
    { label: "Escalation", tone: "danger", x: 24, y: 80 },
  ];

  return (
    <div className="handoff-map" aria-label="Band mediated handoff map">
      <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
        <line x1="15" y1="60" x2="50" y2="54" />
        <line x1="44" y1="26" x2="50" y2="54" />
        <line x1="50" y1="54" x2="78" y2="34" />
        <line x1="50" y1="54" x2="78" y2="74" />
        <line x1="50" y1="54" x2="29" y2="78" />
      </svg>
      {nodes.map((node) => (
        <div
          className={`map-node ${node.tone}`}
          key={node.label}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}
      <div className="gate-card">
        <AlertTriangle size={15} />
        <span>Communications unlocks after Legal and Technical post verified findings.</span>
      </div>
    </div>
  );
}

export default App;
