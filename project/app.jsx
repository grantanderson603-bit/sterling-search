// app.jsx — Sterling Search shell, sidebar, top bar, Ask panel, tweaks

const SIDEBAR = [
  { group: "Capture", items: [
    { id: "organize", label: "Inbox · Auto-organize", icon: "inbox", count: 14, badge: "live" },
    { id: "upload",   label: "Upload",                icon: "upload" },
  ]},
  { group: "Find", items: [
    { id: "library",  label: "Library",     icon: "library",  count: SEED.items.length },
    { id: "topics",   label: "Topics · AI", icon: "topics",   count: SEED.topics.length },
    { id: "filetype", label: "By file type",icon: "type" },
    { id: "ask",      label: "Ask Sterling",icon: "ask",      kbd: "⌘K" },
  ]},
  { group: "Work", items: [
    { id: "spaces",     label: "Spaces & tabs",icon: "spaces",     count: SEED.spaces.length },
    { id: "whiteboard", label: "Whiteboards",  icon: "whiteboard", count: 7 },
    { id: "agent",      label: "Agent · tasks",icon: "agent",      count: 6 },
    { id: "reports",    label: "Reports",      icon: "reports",    count: 3 },
    { id: "todo",       label: "To-do list",   icon: "todo",       count: 4 },
  ]},
  { group: "You", items: [
    { id: "memory",     label: "Memory",       icon: "memory",     count: SEED.memories.length },
    { id: "settings",   label: "Integrations", icon: "settings" },
  ]},
];

const CRUMBS = {
  dashboard:  ["HOME", "Brief"],
  organize:   ["INBOX", "Auto-organization · live"],
  upload:     ["CAPTURE", "Upload"],
  library:    ["FIND", "Library"],
  topics:     ["FIND", "Topics · AI"],
  filetype:   ["FIND", "By file type"],
  ask:        ["FIND", "Ask Sterling"],
  spaces:     ["WORK", "Spaces & tabs"],
  whiteboard: ["WORK", "Whiteboards", "Sterling memory v2"],
  agent:      ["WORK", "Agent · tasks"],
  reports:    ["WORK", "Reports"],
  todo:       ["WORK", "To-do list"],
  memory:     ["YOU", "Memory"],
  settings:   ["YOU", "Integrations"],
  search:     ["FIND", "Search results"],
};

// ─── Sidebar ───────────────────────────────────────────────────────────
function Sidebar({ active, onNav, collapsed, onBrandClick }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand" onClick={onBrandClick} style={{ cursor:"pointer" }}>
        <div className="sb-mark">S</div>
        <span className="sb-name">STERLING</span>
        <span className="sb-version">v1.4 · β</span>
      </div>
      {SIDEBAR.map((g, i) => (
        <div className="sb-group" key={i}>
          <div className="sb-group-h">
            <span>{g.group}</span>
            {i === 0 && <span style={{ color:"var(--ok)" }}>● live</span>}
          </div>
          {g.items.map(it => (
            <div key={it.id} className={`sb-item ${active === it.id ? "active" : ""}`}
                 onClick={() => onNav(it.id)} title={collapsed ? it.label : ""}>
              <span className="sb-icon"><Icon name={it.icon} size={14} stroke={1.25} /></span>
              <span>{it.label}</span>
              {it.kbd && <span className="sb-count mono">{it.kbd}</span>}
              {it.badge === "live" && <span className="sb-count" style={{ color:"var(--ok)" }}>● {it.count}</span>}
              {it.count != null && it.badge !== "live" && <span className="sb-count">{it.count}</span>}
            </div>
          ))}
        </div>
      ))}
      <div style={{ flex:1 }}></div>
      <div style={{ padding:"10px 16px", borderTop:"0.5px solid var(--line-soft)", display: collapsed ? "none" : "flex", alignItems:"center", gap: 10 }}>
        <div style={{ width:24, height:24, background:"var(--bg-2)", border:"0.5px solid var(--line-soft)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-mono)", fontWeight:600, fontSize:11 }}>W</div>
        <div style={{ display:"flex", flexDirection:"column", gap:1, minWidth:0, flex:1 }}>
          <div style={{ fontSize:11.5, fontWeight:500 }}>Will Sterling</div>
          <div className="mono dim" style={{ fontSize:10 }}>will@serenity.app · pro</div>
        </div>
        <Icon name="settings" size={13} color="var(--ink-3)" />
      </div>
    </aside>
  );
}


// ─── Top bar ───────────────────────────────────────────────────────────
function TopBar({ active, query, setQuery, onSearch, onCmd, onUpload, onAsk, askOpen }) {
  const crumbs = CRUMBS[active] || ["HOME"];
  const inputRef = React.useRef(null);
  return (
    <div className="topbar">
      <div className="tb-crumbs">
        <Icon name="arrowL" size={12} color="var(--ink-3)" />
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            <span style={{ color: i === crumbs.length - 1 ? "var(--ink)" : "var(--ink-3)", fontWeight: i === crumbs.length - 1 ? 500 : 400 }}>
              {c}
            </span>
            {i < crumbs.length - 1 && <span style={{ color:"var(--ink-4)" }}>/</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="tb-search" onClick={() => inputRef.current?.focus()}>
        <Icon name="search" size={13} color="var(--ink-3)" />
        <input
          ref={inputRef}
          placeholder='Search "guitar samples 96 BPM", ask "what did I save yesterday", or paste a URL…'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && query.trim()) onSearch(); }}
        />
        <span className="tb-kbd">⌘K</span>
      </div>
      <div className="tb-right">
        <button className="tb-btn" onClick={onCmd}><Icon name="search" size={12} /> Command</button>
        <button className="tb-btn" onClick={onUpload}><Icon name="upload" size={12} /> Save</button>
        <button className="tb-btn primary" onClick={onAsk}>
          <Icon name="sparkle" size={12} /> Ask {askOpen ? "·" : ""}
        </button>
      </div>
    </div>
  );
}


// ─── Ask Panel ──────────────────────────────────────────────────────────
const SEED_THREAD = [
  {
    role: "you",
    text: "What guitar samples do I have around 96 BPM?",
  },
  {
    role: "bot",
    text: "Three takes that match — all 96 BPM, E-minor adjacent.",
    cites: [
      { id: "i04",  label: "GTR_clean_96bpm_E", tag: "WAV" },
      { id: "i19",  label: "GTR_dirty_96bpm_Bb", tag: "WAV" },
      { id: "i11",  label: "DRM_breakbeat_94bpm_dry", tag: "WAV" },
    ],
    follow: "Want me to compile them into a project folder, or surface what's missing (you're light on ambient at this BPM)?",
  },
];

function AskPanel({ onClose }) {
  const [msgs, setMsgs] = React.useState(SEED_THREAD);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const bodyRef = React.useRef(null);

  const scrollDown = () => {
    requestAnimationFrame(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; });
  };
  React.useEffect(scrollDown, [msgs]);

  const send = (txt) => {
    if (!txt.trim()) return;
    setInput("");
    setMsgs(prev => [...prev, { role: "you", text: txt }]);
    setStreaming(true);
    setTimeout(() => {
      const reply = generateReply(txt);
      setMsgs(prev => [...prev, reply]);
      setStreaming(false);
    }, 900);
  };

  const suggestions = [
    "What did I save last week about AI browsers?",
    "Find every 96 BPM sample I have.",
    "Summarize my PDFs about second-brain apps.",
    "Pull every PR I haven't reviewed this week.",
  ];

  return (
    <aside className="ask panel">
      <div className="ask-hd">
        <Icon name="sparkle" size={14} />
        <b>Ask Sterling</b>
        <span className="mono dim" style={{ fontSize:10, marginLeft:6 }}>· cites your library</span>
        <div style={{ flex:1 }}></div>
        <button className="btn ghost" style={{ height:24, padding:"0 8px" }} onClick={onClose}>
          <Icon name="close" size={11} />
        </button>
      </div>
      <div className="ask-body" ref={bodyRef}>
        {msgs.map((m, i) => (
          <AskMessage key={i} m={m} />
        ))}
        {streaming && (
          <div style={{ display:"flex", gap: 6, alignItems:"center", fontFamily:"var(--font-mono)", fontSize: 11, color:"var(--ink-2)" }}>
            <span className="pulse" style={{ width:6, height:6 }}></span>
            Searching memory + library<span className="dots" style={{ display:"inline-block", width:18 }}></span>
          </div>
        )}
      </div>
      <div className="ask-suggests">
        {suggestions.map((s, i) => (
          <button key={i} className="ask-suggest" onClick={() => send(s)}>· {s}</button>
        ))}
      </div>
      <div className="ask-input">
        <input
          placeholder="Ask anything — search, summarize, do…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(input); }}
        />
        <button className="ask-send" onClick={() => send(input)}>Send →</button>
      </div>
    </aside>
  );
}

function AskMessage({ m }) {
  if (m.role === "you") {
    return (
      <div>
        <div className="mono uppercase tiny dim" style={{ marginBottom: 6 }}>· You</div>
        <div className="ask-msg you" style={{ paddingLeft: 0 }}>{m.text}</div>
      </div>
    );
  }
  return (
    <div>
      <div className="mono uppercase tiny dim" style={{ marginBottom: 6, display:"flex", alignItems:"center", gap:6 }}>
        <Icon name="sparkle" size={9} /> STERLING · 0.8s · 14 items searched
      </div>
      <div className="ask-msg bot">{m.text}</div>
      {m.cites && (
        <div className="src">
          {m.cites.map((c, i) => (
            <span key={i} className="ask-cite">
              <span className="mono dim" style={{ fontSize:9 }}>{c.tag}</span>
              <b>{c.label}</b>
            </span>
          ))}
        </div>
      )}
      {m.follow && (
        <div style={{ marginTop: 10, padding: 10, background:"var(--paper)", border:"0.5px solid var(--line-soft)", fontFamily:"var(--font-mono)", fontSize: 11, color:"var(--ink-2)" }}>
          · {m.follow}
        </div>
      )}
    </div>
  );
}

// fake reply generator
function generateReply(q) {
  const lower = q.toLowerCase();
  if (lower.includes("96") || lower.includes("guitar") || lower.includes("sample")) {
    return {
      role: "bot",
      text: "Three takes that match — all 96 BPM, E-minor adjacent.",
      cites: [
        { id: "i04",  label: "GTR_clean_96bpm_E", tag: "WAV" },
        { id: "i19",  label: "GTR_dirty_96bpm_Bb", tag: "WAV" },
      ],
      follow: "Want me to compile them into a project folder?",
    };
  }
  if (lower.includes("yesterday") || lower.includes("last week") || lower.includes("today")) {
    return {
      role: "bot",
      text: "You saved 47 items this week, mostly clustered around AI browsers and Sterling memory v2. 14 are still in Inbox.",
      cites: [
        { label: "AI Browsers · 18", tag: "TOPIC" },
        { label: "Product Specs · 9", tag: "TOPIC" },
        { label: "Inbox · 14", tag: "BOX" },
      ],
      follow: "Want a one-page report, or just the unread highlights?",
    };
  }
  if (lower.includes("pdf") || lower.includes("second brain") || lower.includes("summar")) {
    return {
      role: "bot",
      text: "Across 8 PDFs about second-brain apps, one pattern dominates: relevance beats completeness. Mymind hides what you didn't open; Pieces embeds everything but ranks by recency; Obsidian leaves it to you. Your saved annotations lean toward Mymind's stance.",
      cites: [
        { label: "Memex revisited", tag: "PDF" },
        { label: "Why second-brains fail at recall", tag: "LINK" },
        { label: "Pieces OS — LTM", tag: "LINK" },
      ],
      follow: "Should I draft a one-pager for your memory v2 RFC using these?",
    };
  }
  if (lower.includes("pr") || lower.includes("review") || lower.includes("github")) {
    return {
      role: "bot",
      text: "3 PRs need your eyes this week. The oldest is #479 (brutalist mono on Library, 5d).",
      cites: [
        { label: "#482 wire embeddings into capture", tag: "PR" },
        { label: "#481 collapse memory & saved schema", tag: "PR" },
        { label: "#479 brutalist mono on Library", tag: "PR" },
      ],
      follow: "Want me to open them all in Work · Spaces?",
    };
  }
  return {
    role: "bot",
    text: "I searched your library, memory, and the open spaces — nothing exact. The closest matches are below.",
    cites: SEED.items.slice(0, 3).map(it => ({ label: it.title, tag: it.type.toUpperCase().slice(0,3) })),
    follow: "Want me to search the web as well?",
  };
}


// ─── Command Palette ───────────────────────────────────────────────────
function CommandPalette({ onClose, onNav }) {
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const all = [
    { sec: "Go", label: "Go to Inbox · auto-organize",   icon: "inbox",    do: () => onNav("organize") },
    { sec: "Go", label: "Go to Library",                  icon: "library",  do: () => onNav("library") },
    { sec: "Go", label: "Go to Topics",                   icon: "topics",   do: () => onNav("topics") },
    { sec: "Go", label: "Go to Spaces & tabs",            icon: "spaces",   do: () => onNav("spaces") },
    { sec: "Go", label: "Go to Whiteboards",              icon: "whiteboard", do: () => onNav("whiteboard") },
    { sec: "Go", label: "Go to Memory",                   icon: "memory",   do: () => onNav("memory") },
    { sec: "Do", label: "Save the current page",           icon: "upload",   do: () => onClose() },
    { sec: "Do", label: "Capture screenshot to Library",   icon: "image",    do: () => onClose() },
    { sec: "Do", label: "Tidy open tabs",                  icon: "sparkle",  do: () => onNav("spaces") },
    { sec: "Do", label: "Find duplicates and merge",       icon: "agent",    do: () => onNav("agent") },
    { sec: "Ask",label: "Ask: what did I save yesterday?", icon: "ask",      do: () => onNav("ask") },
    { sec: "Ask",label: "Ask: every 96 BPM sample I have", icon: "ask",      do: () => onNav("ask") },
  ];
  const filtered = q ? all.filter(c => c.label.toLowerCase().includes(q.toLowerCase())) : all;

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(filtered.length - 1, i + 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); }
      if (e.key === "Enter")     { e.preventDefault(); filtered[idx]?.do(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, idx]);

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-box" onClick={e => e.stopPropagation()}>
        <div className="cmd-input">
          <Icon name="search" size={14} color="var(--ink-3)" />
          <input autoFocus placeholder="Type a command, ask, or jump anywhere…" value={q}
                 onChange={e => { setQ(e.target.value); setIdx(0); }} />
          <span className="tb-kbd">esc</span>
        </div>
        <div className="cmd-list">
          {filtered.map((c, i) => (
            <div key={i} className={`cmd-row ${i === idx ? "on" : ""}`}
                 onMouseEnter={() => setIdx(i)} onClick={() => { c.do(); onClose(); }}>
              <Icon name={c.icon} size={13} />
              <span>{c.label}</span>
              <span className="sec">{c.sec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── Upload Modal ──────────────────────────────────────────────────────
function UploadModal({ onClose, onAfter }) {
  const [stage, setStage] = React.useState("pick"); // pick → analyzing → done
  const [urlMode, setUrlMode] = React.useState(false);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <h3>Save to Sterling</h3>
          <button className="btn ghost" onClick={onClose} style={{ height:26 }}>
            <Icon name="close" size={11} />
          </button>
        </div>
        <div className="modal-body">
          {stage === "pick" && (
            <>
              <div className="seg" style={{ width:"100%", marginBottom: 16 }}>
                <button className={!urlMode ? "on" : ""} onClick={() => setUrlMode(false)} style={{ flex:1 }}>Drop a file</button>
                <button className={urlMode ? "on" : ""}  onClick={() => setUrlMode(true)}  style={{ flex:1 }}>Save a link</button>
              </div>
              {!urlMode ? (
                <div className="dropzone" onClick={() => setStage("analyzing")}>
                  <b>Drop anything here</b>
                  files · screenshots · audio · PDFs · or paste with ⌘V
                </div>
              ) : (
                <>
                  <input className="tb-search" placeholder="https://…" style={{ width:"100%", height:42, border:"0.5px solid var(--line)", padding:"0 14px", fontFamily:"var(--font-mono)" }} autoFocus />
                  <button className="btn accent" style={{ marginTop:14, width:"100%", height:38 }} onClick={() => setStage("analyzing")}>
                    <Icon name="upload" /> Save & auto-organize
                  </button>
                </>
              )}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 8, marginTop: 18 }}>
                {[["⌘V","Paste"],["⌘⇧S","Screenshot"],["⌘B","Bookmark tab"]].map(([k, l], i) => (
                  <div key={i} style={{ border:"0.5px solid var(--line-soft)", padding:"10px 12px", display:"flex", flexDirection:"column", gap:4 }}>
                    <span className="tb-kbd" style={{ alignSelf:"flex-start" }}>{k}</span>
                    <span style={{ fontSize:11, color:"var(--ink-2)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {stage === "analyzing" && (
            <div style={{ padding:"30px 0", textAlign:"center" }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom: 16 }}>
                <span className="pulse" style={{ width: 12, height: 12 }}></span>
              </div>
              <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>ANALYZING · extracting text · embedding</div>
              <div style={{ fontFamily:"var(--font-serif)", fontSize: 22, lineHeight: 1.3 }}>
                Sterling is reading <em>your-file.pdf</em> and picking a topic…
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap: 6, marginTop: 18 }}>
                <Chip>Reading text</Chip>
                <Chip kind="bold">Topic: AI Browsers</Chip>
                <Chip kind="accent">Filing</Chip>
              </div>
              <button className="btn" style={{ marginTop: 24 }} onClick={() => { onAfter && onAfter(); onClose(); }}>
                Open in Library
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── App ────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "lime",
  "dark": false,
  "sidebar": "expanded",
  "view": "grid",
  "density": "regular",
  "panel": "right"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("organize");
  const [query, setQuery] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [askOpen, setAskOpen] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);

  // sync theme/palette/sidebar/panel to <html data-*>
  React.useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme    = t.dark ? "dark" : "light";
    html.dataset.palette  = t.palette;
    html.dataset.sidebar  = t.sidebar;
    html.dataset.density  = t.density;
    html.dataset.panel    = t.panel;
  }, [t]);

  // global keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen(true); }
      if (meta && e.key.toLowerCase() === "j") { e.preventDefault(); setAskOpen(o => !o); }
      if (meta && e.key.toLowerCase() === "u") { e.preventDefault(); setUploadOpen(true); }
      if (meta && e.key === ".")               { e.preventDefault(); setTweak("sidebar", t.sidebar === "expanded" ? "collapsed" : "expanded"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t.sidebar]);

  const nav = (id) => {
    if (id === "upload") { setUploadOpen(true); return; }
    if (id === "ask")    { setAskOpen(true); return; }
    setSearching(false);
    setActive(id);
  };

  const screen = (() => {
    if (searching) return <ScreenSearch query={query} onClose={() => { setSearching(false); setQuery(""); }} />;
    switch (active) {
      case "organize":   return <ScreenOrganize />;
      case "library":    return <ScreenLibrary view={t.view} setView={v => setTweak("view", v)} density={t.density} />;
      case "topics":     return <ScreenTopics />;
      case "filetype":   return <ScreenLibrary view={t.view} setView={v => setTweak("view", v)} density={t.density} />;
      case "spaces":     return <ScreenSpaces />;
      case "whiteboard": return <ScreenWhiteboard />;
      case "agent":      return <ScreenAgent />;
      case "memory":     return <ScreenMemory />;
      case "reports":    return <ScreenReports />;
      case "todo":       return <ScreenReports />;
      case "settings":   return <ScreenSettings />;
      case "dashboard":  return <ScreenDashboard onNav={nav} openAsk={() => setAskOpen(true)} />;
      default:           return <ScreenDashboard onNav={nav} openAsk={() => setAskOpen(true)} />;
    }
  })();

  return (
    <>
      <div className={`app-grid ${askOpen ? "with-panel" : ""}`}>
        <Sidebar active={active} onNav={nav} collapsed={t.sidebar === "collapsed"} onBrandClick={() => nav("dashboard")} />
        <TopBar
          active={searching ? "search" : active}
          query={query} setQuery={setQuery}
          onSearch={() => setSearching(true)}
          onCmd={() => setCmdOpen(true)}
          onUpload={() => setUploadOpen(true)}
          onAsk={() => setAskOpen(o => !o)}
          askOpen={askOpen}
        />
        <main className="main">{screen}</main>
        {askOpen && <AskPanel onClose={() => setAskOpen(false)} />}
      </div>

      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} onNav={(id) => { nav(id); }} />}
      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} onAfter={() => nav("library")} />}

      <TweaksPanel>
        <TweakSection label="Theme">
          <TweakColor label="Accent" value={t.palette}
            options={[
              { value: "lime",   label: "Lime"   },
              { value: "cyan",   label: "Cyan"   },
              { value: "orange", label: "Orange" },
              { value: "violet", label: "Violet" },
              { value: "mono",   label: "Mono"   },
            ].map(o => o.value)}
            onChange={(v) => setTweak("palette", v)} />
          <TweakSelect label="Accent" value={t.palette} options={["lime","cyan","orange","violet","mono"]} onChange={v => setTweak("palette", v)} />
          <TweakToggle label="Dark mode" value={t.dark} onChange={v => setTweak("dark", v)} />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio label="Sidebar"  value={t.sidebar}  options={["expanded","collapsed"]} onChange={v => setTweak("sidebar", v)} />
          <TweakRadio label="Density"  value={t.density}  options={["regular","dense"]}      onChange={v => setTweak("density", v)} />
          <TweakRadio label="Library"  value={t.view}     options={["grid","list"]}          onChange={v => setTweak("view", v)} />
          <TweakRadio label="Ask panel" value={t.panel}   options={["right","bottom"]}        onChange={v => setTweak("panel", v)} />
        </TweakSection>
        <TweakSection label="Shortcuts">
          <div className="mono" style={{ fontSize:10, color:"rgba(41,38,27,.55)", lineHeight:1.6 }}>
            ⌘K Command palette<br/>
            ⌘J Toggle Ask<br/>
            ⌘U Upload<br/>
            ⌘. Toggle sidebar
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

window.App = App;
