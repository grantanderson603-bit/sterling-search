// screens-2.jsx — Spaces, Memory, Whiteboard, Agent, Reports, Search, Settings

// ─── Spaces / Tabs / Tidy Tabs / Traffic Control ────────────────────────
function ScreenSpaces() {
  const [active, setActive] = React.useState("research");
  const [tidied, setTidied] = React.useState(false);
  const space = SEED.spaces.find(s => s.id === active);

  return (
    <div className="page" style={{ height: "100%" }}>
      <PageHeader
        kicker="Browser Workspace"
        title="Your tabs are"
        em="actually organized."
        sub="4 spaces · 23 pinned · 9 groups · Tidy Tabs ready when you cross 6 open."
        actions={
          <>
            <button className="btn ghost"><Icon name="settings" /> Traffic Control</button>
            <button className={`btn ${tidied ? "" : "accent"}`} onClick={() => setTidied(t => !t)}>
              <Icon name="sparkle" /> {tidied ? "Tidied" : "Tidy Tabs · 14"}
            </button>
          </>
        }
      />
      <div style={{ borderBottom:"0.5px solid var(--line-soft)" }}></div>
      <div className="spaces-grid">
        <div className="spaces-side">
          <div className="mono dim uppercase tiny" style={{ padding:"4px 12px 10px" }}>Spaces</div>
          {SEED.spaces.map(s => {
            const ct = s.pinned.length + s.groups.reduce((a, g) => a + g.tabs.length, 0);
            return (
              <div key={s.id} className={`space-pill ${active === s.id ? "on" : ""}`} onClick={() => setActive(s.id)}>
                <div className="sw" style={{ background: s.color }}></div>
                <span>{s.name}</span>
                <span className="ct tnum">{ct}</span>
              </div>
            );
          })}
          <div className="mono dim uppercase tiny" style={{ padding:"18px 12px 10px" }}>Smart</div>
          <div className="space-pill"><Icon name="folder" size={12} /><span>Library</span><span className="ct tnum">1.2k</span></div>
          <div className="space-pill"><Icon name="whiteboard" size={12} /><span>Whiteboards</span><span className="ct tnum">7</span></div>
          <div className="space-pill"><Icon name="folder" size={12} /><span>Archived tabs</span><span className="ct tnum">208</span></div>
          <div style={{ flex:1 }}></div>
          <div className="mono dim uppercase tiny" style={{ padding:"4px 12px" }}>Traffic Rules · 6 active</div>
          <div style={{ padding:"4px 12px 12px", display:"flex", flexDirection:"column", gap: 4 }}>
            {[
              ["github.com/*", "Work"],
              ["splice.com/*", "Music"],
              ["are.na/*", "Research"],
              ["calendar.google.com", "Life"],
            ].map(([d, s], i) => (
              <div key={i} style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--ink-2)", display:"flex", justifyContent:"space-between" }}>
                <span>{d}</span><span>→ {s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-list">
          {tidied && (
            <div className="tile accent" style={{ marginBottom: 4 }}>
              <h3 style={{ color:"var(--ink)" }}><Icon name="sparkle" size={10} /> Sterling tidied 14 tabs into 3 groups</h3>
              <div className="mono" style={{ fontSize: 11 }}>Grouped by intent · today's session · undo any with cmd-z</div>
            </div>
          )}

          <div className="tab-section">
            <h4>Pinned · {space.name} <span style={{ color:"var(--ink-4)", letterSpacing:0 }}>· never auto-archive</span></h4>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap: 6 }}>
              {space.pinned.map((t, i) => (
                <div key={i} className="tab-row pinned" style={{ background:"var(--paper)", border:"0.5px solid var(--line-soft)" }}>
                  <div className="fav">{t.fav}</div>
                  <div style={{ overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                    <div style={{ fontSize:12 }}>{t.t}</div>
                  </div>
                  <Icon name="pin" size={11} color="var(--ink-2)" />
                </div>
              ))}
            </div>
          </div>

          {space.groups.map((g, gi) => (
            <div className="tab-group" key={gi}>
              <h5>
                <span style={{ width:10, height:10, background: g.color, display:"inline-block", border:"0.5px solid var(--line)" }}></span>
                {g.name}
                <span className="ct mono">· {g.tabs.length}</span>
                <span style={{ flex:1 }}></span>
                <span className="mono dim" style={{ fontSize:10 }}>cmd-G</span>
              </h5>
              {g.tabs.map((t, ti) => (
                <div key={ti} className="tab-row">
                  <div className="fav">{t.fav}</div>
                  <div style={{ overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                    {t.t} <span className="u" style={{ marginLeft:8 }}>{t.u}</span>
                  </div>
                  <Icon name="close" size={11} color="var(--ink-3)" />
                </div>
              ))}
            </div>
          ))}

          {space.archived.length > 0 && (
            <div>
              <h4 className="mono uppercase tiny dim" style={{ margin:"12px 0 6px", letterSpacing:"0.14em" }}>Archived · last 7 days</h4>
              <div style={{ display:"flex", flexDirection:"column", gap: 4 }}>
                {space.archived.map((t, i) => (
                  <div key={i} className="tab-row" style={{ opacity:0.55 }}>
                    <div className="fav">{t.fav}</div>
                    <div style={{ overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                      {t.t} <span className="u" style={{ marginLeft:8 }}>{t.u}</span>
                    </div>
                    <span className="u">{t.arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── Memory ─────────────────────────────────────────────────────────────
function ScreenMemory() {
  const [memoryOn, setMemoryOn] = React.useState(true);
  return (
    <div className="page">
      <PageHeader
        kicker="Memory · private"
        title="What Sterling"
        em="remembers."
        sub={`${SEED.memories.length}+ entries · all editable · indexed on-device first`}
        actions={
          <>
            <button className="btn ghost"><Icon name="filter" /> Sources</button>
            <button className={`btn ${memoryOn ? "primary" : ""}`} onClick={() => setMemoryOn(m => !m)}>
              <Icon name={memoryOn ? "pause" : "play"} /> {memoryOn ? "Pause memory" : "Resume"}
            </button>
            <button className="btn"><Icon name="plus" /> Add memory</button>
          </>
        }
      />
      <div className="page-body" style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 32 }}>
        <div>
          <div className="mono uppercase tiny dim" style={{ marginBottom: 4 }}>· Recent · auto-captured & manual</div>
          {SEED.memories.map((m, i) => (
            <div key={i} className="mem-row">
              <div className="mem-when">{m.when}</div>
              <div className="mem-txt">
                <div style={{ fontFamily:"var(--font-serif)", fontSize:17, lineHeight:1.4 }}>{m.txt}</div>
              </div>
              <div className="mem-src">{m.src}</div>
              <div><Icon name="close" size={12} color="var(--ink-3)" /></div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap: 14 }}>
          <div className="tile" style={{ minHeight: 0 }}>
            <h3>· Memory policy</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                ["Capture from saved items", true],
                ["Capture from connected apps", true],
                ["Summarize meeting notes", false],
                ["Index Gmail & Calendar", false],
                ["Allow memory in search", true],
              ].map(([label, on], i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"4px 0", borderBottom: i < 4 ? "0.5px solid var(--line-soft)" : 0 }}>
                  <span style={{ fontSize:12 }}>{label}</span>
                  <Toggle on={on} />
                </div>
              ))}
            </div>
          </div>
          <div className="tile inverse" style={{ minHeight: 0 }}>
            <h3>· You can always say</h3>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:18, lineHeight:1.35 }}>
              "Forget what I read about <em>X</em>." Memory respects forgetting.
            </div>
            <div style={{ display:"flex", gap:8, marginTop:"auto" }}>
              <button className="btn" style={{ background:"transparent", color:"var(--bg)", borderColor:"var(--bg)" }}>Export all</button>
              <button className="btn" style={{ background:"var(--signal)", color:"#fff", borderColor:"var(--signal)" }}>Forget · pick</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ on }) {
  return (
    <div style={{ width:32, height:18, background: on ? "var(--ink)" : "var(--line-soft)", border:"0.5px solid var(--line)", position:"relative", borderRadius:1 }}>
      <div style={{ position:"absolute", top:1, left: on ? 15 : 1, width:14, height:14, background: on ? "var(--accent)" : "var(--bg)", transition:"left .15s" }}></div>
    </div>
  );
}


// ─── Whiteboard ─────────────────────────────────────────────────────────
function ScreenWhiteboard() {
  return (
    <div className="page">
      <PageHeader
        kicker="Whiteboard · 03 of 07"
        title="Sterling"
        em="memory v2"
        sub="Last edited 18m ago · 14 items · 3 contributors (you)"
        actions={
          <>
            <button className="btn ghost"><Icon name="plus" /> Note</button>
            <button className="btn ghost"><Icon name="link" /> Link</button>
            <button className="btn ghost"><Icon name="image" /> Image</button>
            <button className="btn accent"><Icon name="sparkle" /> Summarize</button>
          </>
        }
      />
      <div className="page-body">
        <div className="wb-canvas">
          <div className="wb-note" style={{ top: 24, left: 32, transform: "rotate(-1.2deg)" }}>
            <div className="h">Question · core</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:17, lineHeight:1.25 }}>
              Embed everything, or only what the user opens twice?
            </div>
          </div>
          <div className="wb-note note-2" style={{ top: 70, left: 280, width: 240, transform: "rotate(0.8deg)" }}>
            <div className="h" style={{ color:"var(--ink-2)" }}>Pieces OS take</div>
            <div style={{ fontSize:12 }}>They embed everything; rely on relevance + recency as the surface.</div>
            <div className="mono dim tiny" style={{ marginTop:8 }}>→ pieces.app · linked</div>
          </div>
          <div className="wb-note note-3" style={{ top: 240, left: 60, width: 220, transform: "rotate(-0.5deg)" }}>
            <div className="h" style={{ opacity:0.5 }}>My current bias</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:16, lineHeight:1.3 }}>
              Only embed second-touch items. First-touch stays in inbox.
            </div>
          </div>
          <div className="wb-note" style={{ top: 320, left: 360, width: 260, transform: "rotate(1deg)" }}>
            <div className="h">Cost note</div>
            <div style={{ fontSize:12.5 }}>
              Embedding every page = ~$8/user/month at current usage.
              Second-touch only = $1.20.
            </div>
          </div>
          <div className="wb-note note-2" style={{ top: 360, left: 720, width: 220, transform: "rotate(-1deg)" }}>
            <div className="h">Privacy</div>
            <div style={{ fontSize:12 }}>Reduces blast radius if the embeddings table leaks. Wins both ways.</div>
          </div>

          <div className="wb-img" style={{ top: 80, left: 660, width: 260, height: 160, padding: 14, background:"var(--paper)" }}>
            <div className="mono dim tiny" style={{ marginBottom:8 }}>SKETCH · IA · search v2</div>
            <svg viewBox="0 0 220 90" width="100%" height="80%">
              <rect x="10" y="10" width="50" height="20" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <rect x="80" y="10" width="50" height="20" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <rect x="150" y="10" width="50" height="20" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <line x1="35" y1="30" x2="35" y2="60" stroke="#0A0A0A" />
              <line x1="105" y1="30" x2="105" y2="60" stroke="#0A0A0A" />
              <line x1="175" y1="30" x2="175" y2="60" stroke="#0A0A0A" />
              <rect x="40" y="60" width="130" height="20" stroke="#0A0A0A" strokeWidth="1" fill="#F0FF31" />
            </svg>
          </div>

          <div className="wb-img" style={{ top: 260, left: 380, width: 280, height: 110, padding: 12, background:"#0A0A0A", color:"#F4F3EE" }}>
            <div className="mono tiny" style={{ marginBottom:8, opacity:0.6, letterSpacing:"0.08em", textTransform:"uppercase" }}>WEB CAPTURE · supabase</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:16, lineHeight:1.25 }}>
              "We picked pgvector because the embedding query happens next to the relational filter — one round trip instead of two."
            </div>
          </div>

          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="#0A0A0A" />
              </marker>
            </defs>
            <path d="M180 80 Q 240 60 290 90" stroke="#0A0A0A" strokeWidth="1" fill="none" markerEnd="url(#arr)" />
            <path d="M260 300 Q 360 320 390 320" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="3 3" fill="none" markerEnd="url(#arr)" />
          </svg>
        </div>
      </div>
    </div>
  );
}


// ─── Agent Tasks ────────────────────────────────────────────────────────
function ScreenAgent() {
  return (
    <div className="page">
      <PageHeader
        kicker="Agent · supervised"
        title="Sterling can do"
        em="that for you."
        sub="6 tasks · 2 running · 2 done today · agent always asks before destructive moves"
        actions={
          <>
            <button className="btn ghost"><Icon name="folder" /> Saved workflows</button>
            <button className="btn accent"><Icon name="plus" /> New task</button>
          </>
        }
      />
      <div className="page-body" style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap: 28 }}>
        <div>
          <div className="mono uppercase tiny dim" style={{ marginBottom: 6 }}>· Active queue</div>
          {SEED.tasks.map((t, i) => (
            <div className={`agent-row ${t.state}`} key={i}>
              <div className="ttl">
                <div>{t.ttl}</div>
                <div className="step">· {t.step}</div>
              </div>
              <div className="pg"><i style={{ width: `${t.pg}%` }} /></div>
              <div className="mono tnum dim" style={{ fontSize:10.5 }}>{t.pg}%</div>
              <div className="stat">{t.stat}</div>
              <div><Icon name="close" size={12} color="var(--ink-3)" /></div>
            </div>
          ))}

          <div className="mono uppercase tiny dim" style={{ margin:"24px 0 8px" }}>· Live log · Find and dedupe my saved AI browser articles</div>
          <div style={{ background:"var(--ink)", color:"var(--bg)", padding: 16, fontFamily:"var(--font-mono)", fontSize:11, lineHeight: 1.7 }}>
            <div><span style={{ color:"#F0FF31" }}>[09:14:02]</span> queue: pulled 38 candidates from topic "ai-browsers"</div>
            <div><span style={{ color:"#F0FF31" }}>[09:14:03]</span> embeddings: cosine ≥ 0.91 → 6 pairs</div>
            <div><span style={{ color:"#F0FF31" }}>[09:14:05]</span> dedupe: comparing canonical urls, dates, hashes</div>
            <div><span style={{ color:"#F0FF31" }}>[09:14:08]</span> match: arc-vs-dia (2024-10-04) ≈ arc-vs-dia (2024-10-04 cached) → keep newest</div>
            <div><span style={{ color:"#F0FF31" }}>[09:14:09]</span> match: mcp-explainer (substack) ≈ mcp-explainer (rss reposted) → keep canonical</div>
            <div><span style={{ color:"#F0FF31" }}>[09:14:11]</span> <span style={{ color:"#FF6A1F" }}>PAUSE</span> 1 of 6 candidates is ambiguous — needs your call</div>
            <div style={{ color:"#F0FF31", marginTop: 8 }}>[09:14:12] awaiting confirmation ↓</div>
            <div style={{ background:"#F0FF31", color:"#0A0A0A", padding:"8px 10px", marginTop: 8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontWeight:600 }}>"Browser company — Dia announcement (Oct 4)"</div>
                <div style={{ opacity:0.7, marginTop:2 }}>vs · "Dia by The Browser Company (Oct 5, video transcript)"</div>
              </div>
              <div style={{ display:"flex", gap: 6 }}>
                <button style={{ background:"var(--ink)", color:"#F0FF31", border:0, padding:"4px 10px", fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" }}>Keep both</button>
                <button style={{ background:"transparent", color:"var(--ink)", border:"0.5px solid var(--ink)", padding:"4px 10px", fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" }}>Merge</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div className="tile">
            <h3>· Tools the agent can use</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[
                ["Browser · headless Chromium", "ready"],
                ["MCP servers · 3 connected", "ready"],
                ["FAZM computer-use", "configure"],
                ["Gmail · read-only", "ready"],
                ["GitHub · read-only", "ready"],
                ["Notion · read-write", "needs-auth"],
              ].map(([t, s], i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 0", borderTop: i ? "0.5px solid var(--line-soft)" : 0, fontSize:12 }}>
                  <span>{t}</span>
                  <Chip kind={s === "ready" ? "default" : s === "configure" ? "bold" : "accent"}>{s.toUpperCase()}</Chip>
                </div>
              ))}
            </div>
          </div>

          <div className="tile accent">
            <h3 style={{ color:"var(--ink)" }}>· Confirmation policy</h3>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:18, lineHeight:1.35 }}>
              The agent always asks before deleting, sending, or paying.
            </div>
            <div style={{ display:"flex", gap: 8, marginTop:"auto" }}>
              <button className="btn">Adjust</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Reports & To-Dos (combined) ────────────────────────────────────────
function ScreenReports() {
  return (
    <div className="page">
      <PageHeader
        kicker="Reports"
        title="Made from what you've"
        em="already saved."
        sub="3 reports this month · pulled from links, PDFs, notes & connected apps"
        actions={<button className="btn accent"><Icon name="sparkle" /> Generate report</button>}
      />
      <div className="page-body" style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 28 }}>
        <div>
          <div className="lib-list">
            <div className="lib-list-h">
              <div></div><div>Title</div><div>Sources</div><div>Topic</div><div style={{ textAlign:"right" }}>Made</div><div></div>
            </div>
            {[
              { ttl: "AI Browsers · Q1 → Q2 landscape", sub: "38 saves · 6 articles · 2 PDFs · 4 videos", topic: "AI Browsers", tag: "RPT", when: "today" },
              { ttl: "Memory v2 — internal RFC", sub: "12 saves · 4 notes · 1 whiteboard", topic: "Product Specs", tag: "RPT", when: "2d" },
              { ttl: "Guitar samples · what's in your library", sub: "41 saves · 0 notes · grouped by BPM", topic: "Guitar Samples", tag: "RPT", when: "1w" },
            ].map((r, i) => (
              <div className="lib-row" key={i}>
                <div className="row-type">{r.tag}</div>
                <div className="row-ttl"><b>{r.ttl}</b><div className="row-sub">{r.sub}</div></div>
                <div className="row-tags"><Chip kind="bold">Markdown</Chip><Chip>PDF</Chip></div>
                <div className="mono" style={{ fontSize: 10.5 }}>{r.topic}</div>
                <div className="mono dim tnum" style={{ fontSize: 10.5, textAlign:"right" }}>{r.when} ago</div>
                <div style={{ display:"flex", justifyContent:"flex-end" }}><Icon name="arrow" size={12} color="var(--ink-3)" /></div>
              </div>
            ))}
          </div>

          <div className="mono uppercase tiny dim" style={{ margin:"28px 0 8px" }}>· Today's to-dos · pulled from your saves</div>
          <div style={{ background:"var(--paper)", border:"0.5px solid var(--line-soft)" }}>
            {[
              { d: false, t: "Reply to D. about PM interview availability", src: "Gmail · 2h" },
              { d: false, t: "Re-review PR #482 (vector embeddings into capture)", src: "GitHub · 4h" },
              { d: true,  t: "Send memory v2 RFC to E. before standup", src: "you · note" },
              { d: false, t: "Order Diatype license for the Sterling site", src: "Stripe Atlas · 1d" },
              { d: false, t: "Try the 4 unreviewed guitar loops in Inbox", src: "Sterling · auto" },
            ].map((t, i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"24px 1fr 140px", gap: 14, padding:"12px 14px", borderTop: i ? "0.5px solid var(--line-soft)" : 0, alignItems:"center" }}>
                <div style={{ width: 18, height: 18, border:"0.5px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center", background: t.d ? "var(--ink)" : "transparent" }}>
                  {t.d && <Icon name="check" size={11} color="var(--accent)" />}
                </div>
                <div style={{ fontSize: 13, textDecoration: t.d ? "line-through" : "none", color: t.d ? "var(--ink-3)" : "var(--ink)" }}>
                  {t.t}
                </div>
                <div className="mono dim" style={{ fontSize: 10.5, textAlign:"right" }}>{t.src}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap: 14 }}>
          <div className="tile inverse" style={{ minHeight: 0 }}>
            <h3>· Report preview</h3>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:22, lineHeight:1.2, marginTop:4 }}>
              AI Browsers · Q1 → Q2 landscape
            </div>
            <div className="mono" style={{ fontSize:10.5, opacity:0.6 }}>38 sources · generated 14:02 today</div>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:14, lineHeight:1.45, marginTop:8, opacity:0.9 }}>
              "Three meaningful directions emerged this quarter. Arc is committing to a workspace-first model. Dia bets that intent replaces URL entry. Comet positions itself as agent-native from the first paint…"
            </div>
            <div style={{ display:"flex", gap: 8, marginTop:"auto" }}>
              <button className="btn" style={{ background:"transparent", color:"var(--bg)", borderColor:"var(--bg)" }}>Open full</button>
              <button className="btn" style={{ background:"var(--accent)", color:"var(--ink)", borderColor:"var(--accent)" }}>Export PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Settings & Integrations (lightweight) ──────────────────────────────
function ScreenSettings() {
  return (
    <div className="page">
      <PageHeader
        kicker="Settings & Integrations"
        title="Wire up your"
        em="other apps."
        sub="6 integrations available · 3 connected · you control what gets indexed"
      />
      <div className="page-body" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 14 }}>
        {[
          { name: "Gmail",        s: "Connected",   m: "Read-only · 12.4k indexed",  on: true },
          { name: "Google Drive", s: "Connected",   m: "Watching 3 folders",         on: true },
          { name: "Notion",       s: "Connected",   m: "Read-write · 184 pages",     on: true },
          { name: "Slack",        s: "Not connected", m: "Index DMs & threads",      on: false },
          { name: "GitHub",       s: "Connected",   m: "Read-only · 14 repos",       on: true },
          { name: "Calendar",     s: "Not indexed", m: "Read-only · privacy default",on: false },
          { name: "Dropbox",      s: "Not connected", m: "Mirror files into Library",on: false },
          { name: "Browser ext",  s: "Available",   m: "Chrome · Safari · Arc",      on: false },
          { name: "iOS share",    s: "Available",   m: "TestFlight",                 on: false },
        ].map((it, i) => (
          <div key={i} className="tile" style={{ minHeight: 130 }}>
            <h3>· {it.name}</h3>
            <div style={{ fontFamily:"var(--font-serif)", fontSize:18, lineHeight:1.2 }}>{it.s}</div>
            <div className="mono dim" style={{ fontSize: 10.5 }}>{it.m}</div>
            <div style={{ display:"flex", gap: 8, marginTop:"auto" }}>
              <button className="btn" style={{ height: 24, padding:"0 10px" }}>{it.on ? "Manage" : "Connect"}</button>
              {it.on && <Toggle on={true} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── Search results (when something is in the search bar) ──────────────
function ScreenSearch({ query, onClose }) {
  // simple filter
  const q = query.toLowerCase();
  const matches = SEED.items.filter(it =>
    it.title.toLowerCase().includes(q) ||
    it.tags.join(" ").toLowerCase().includes(q) ||
    it.source.toLowerCase().includes(q)
  );
  const topicMatches = SEED.topics.filter(t => t.name.toLowerCase().includes(q) || t.subs.join(" ").toLowerCase().includes(q));

  return (
    <div className="page">
      <PageHeader
        kicker={`Search · ${matches.length + topicMatches.length} results`}
        title={`"${query}"`}
        sub={`across library · topics · memory · tabs · notes`}
        actions={<button className="btn ghost" onClick={onClose}><Icon name="close" /> Clear</button>}
      />
      <div className="page-body">
        {topicMatches.length > 0 && (
          <>
            <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>· Topics</div>
            <div className="topic-grid" style={{ marginBottom: 28 }}>
              {topicMatches.map(t => <TopicCard key={t.id} topic={t} />)}
            </div>
          </>
        )}
        <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>· Items ({matches.length})</div>
        <div className="lib-grid">
          {matches.map(it => <ItemCard key={it.id} item={it} />)}
        </div>
        {matches.length === 0 && topicMatches.length === 0 && (
          <div style={{ padding:"48px 0", textAlign:"center", color:"var(--ink-3)", fontFamily:"var(--font-mono)" }}>
            Nothing yet. Try asking the assistant — it can search the web.
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenSpaces, ScreenMemory, ScreenWhiteboard, ScreenAgent,
  ScreenReports, ScreenSettings, ScreenSearch, Toggle,
});
