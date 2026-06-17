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
  getIncidentAuditHref,
  getIncidentCommandHref,
  getIncidentCommunicationsHref,
  getIncidentIdFromPath,
  type ActionKind,
  type DetailCard,
  type FeedItem,
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
  if (pathname === "/" || isLegacyIncidentPath(pathname)) {
    return getIncidentCommandHref(defaultIncidentId);
  }
  return pathname;
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

export function App({
  workspacePages,
  initialWorkspacePayload,
  loadWorkspaceData,
}: AppProps) {
  const [path, setPath] = useState(getPath);
  const shouldLoadWorkspaceData = loadWorkspaceData ?? !workspacePages;
  const [workspacePayload, setWorkspacePayload] = useState<WorkspacePayload>(() => {
    if (initialWorkspacePayload) return initialWorkspacePayload;
    return fallbackWorkspacePayload(getRouteIncidentId(getPath()));
  });
  const activeWorkspacePages = workspacePages ?? workspacePayload.pages;
  const activeIncidentId = getRouteIncidentId(path, workspacePayload.activeIncidentId);
  const [selectedTabs, setSelectedTabs] = useState<TabState>(() =>
    createInitialTabs(activeWorkspacePages),
  );

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

  const navigate = (href: string) => {
    window.history.pushState(null, "", normalizePath(href));
    setPath(getPath());
  };

  const selectTab = (pageId: string, tabName: string) => {
    setSelectedTabs((current) => ({ ...current, [pageId]: tabName }));
  };

  const runAction = (action: PageAction) => {
    if (!action.kind) return;
    const setTabForPage = (pageId: string, tabName: string) => {
      setSelectedTabs((current) => ({ ...current, [pageId]: tabName }));
    };

    const commandHref = getIncidentCommandHref(activeIncidentId);
    const communicationsHref = getIncidentCommunicationsHref(activeIncidentId);
    const auditHref = getIncidentAuditHref(activeIncidentId);

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

    handlers[action.kind]?.();
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} navigate={navigate} workspacePages={activeWorkspacePages} />
      <main className="workspace">
        <TopBar activePage={activePage} />
        <Workspace
          activePage={activePage}
          activeTab={activeTab}
          selectedTabName={activeTabName}
          selectTab={selectTab}
          runAction={runAction}
        />
      </main>
    </div>
  );
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
          <span>Live + seeded fallback</span>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ activePage }: { activePage: WorkspacePage }) {
  return (
    <header className="topbar">
      <div>
        <h1>{activePage.title}</h1>
      </div>
      <div className="topbar-actions">
        <label className="search-shell">
          <Search size={15} />
          <span className="sr-only">Search</span>
          <input placeholder="Search incidents, evidence, owners" />
        </label>
        <Badge tone="info" label="Band active" />
        <Badge tone="success" label="Synthetic mode" />
        <button className="icon-button" aria-label="Notifications">
          <Bell size={18} />
          <span>3</span>
        </button>
      </div>
    </header>
  );
}

function Workspace({
  activePage,
  activeTab,
  selectedTabName,
  selectTab,
  runAction,
}: {
  activePage: WorkspacePage;
  activeTab: PageTab;
  selectedTabName: string;
  selectTab: (pageId: string, tabName: string) => void;
  runAction: (action: PageAction) => void;
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

      <Metrics metrics={activeTab.metrics} />

      <div className="content-grid">
        <FeedPanel title={activeTab.feedTitle} items={activeTab.feed} />
        <MainPanel tab={activeTab} pageId={activePage.id} />
        <ActionPanel tab={activeTab} runAction={runAction} />
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
}: {
  tab: PageTab;
  runAction: (action: PageAction) => void;
}) {
  return (
    <aside className="right-rail">
      <section className="panel decision-card">
        <div className="decision-tag">
          <Users size={14} />
          <span>Human review</span>
        </div>
        <h3>{tab.actionTitle}</h3>
        <p>{tab.actionSummary}</p>
        <div className="button-stack">
          {tab.actions.map((action) => (
            <button
              key={action.label}
              className={`button tone-${action.tone}`}
              onClick={() => runAction(action)}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <PanelHeader icon={Gauge} title="Notification Center" subtitle="CrisisCoord records first" />
        <div className="stack">
          {tab.status.map((item) => (
            <FeedRow item={item} key={`${item.title}-${item.meta}`} compact />
          ))}
        </div>
      </section>

      <section className="panel compact-card">
        <div>
          <LockKeyhole size={16} />
          <strong>Demo-safe policy</strong>
        </div>
        <p>
          External sends are simulated or limited to configured safe recipients until backend
          approval, audit, and provider gates are connected.
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
