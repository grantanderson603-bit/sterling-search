// screens-1.jsx — Dashboard, Auto-Organization Feed, Library, Topics

// ─── Dashboard / Morning Brief ──────────────────────────────────────────
function ScreenDashboard({ onNav, openAsk }) {
  const b = SEED.brief;
  return (
    <div className="page">
      <PageHeader
        kicker="Thursday · May 15 · 09:14"
        title="Good morning,"
        em="Will."
        sub="3 priorities · 4 meetings · 47 new saves this week."
        actions={
          <>
            <button className="btn ghost" onClick={() => onNav("organize")}>
              <Icon name="inbox" /> Inbox · 14
            </button>
            <button className="btn accent" onClick={openAsk}>
              <Icon name="sparkle" /> Ask Sterling
            </button>
          </>
        }
      />
      <div className="page-body">
        <div className="bento">

          <div className="tile inverse" style={{ gridRow: "span 2", justifyContent:"space-between" }}>
            <div>
              <h3><span style={{ background: "var(--accent)", width:6, height:6 }}></span> Today · Priorities</h3>
              <div style={{ marginTop: 18, display:"flex", flexDirection:"column", gap: 18 }}>
                {b.priorities.map((p, i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:18, height:18, border:"0.5px solid var(--bg)", flexShrink:0, marginTop:4, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span className="mono" style={{ fontSize:9, opacity:0.6 }}>{(i+1).toString().padStart(2,"0")}</span>
                    </div>
                    <div style={{ fontFamily:"var(--font-serif)", fontSize:20, lineHeight:1.3 }}>
                      {p}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap: 8, marginTop:18 }}>
              <button className="btn" style={{ background:"transparent", color:"var(--bg)", borderColor:"var(--bg)" }}>
                Plan day <Icon name="arrow" size={11} />
              </button>
              <button className="btn ghost" style={{ color:"var(--bg)" }}>
                <Icon name="todo" /> Open todo
              </button>
            </div>
          </div>

          <div className="tile">
            <h3><Icon name="folder" size={10} /> Saved · all-time</h3>
            <div className="big tnum">1,284</div>
            <div className="mono dim tnum" style={{ fontSize: 10.5 }}>
              +47 THIS WEEK · +184 THIS MONTH
            </div>
            <MiniSparkline />
          </div>

          <div className="tile accent">
            <h3 style={{ color:"var(--ink)", opacity:1 }}>↑ Memory · active</h3>
            <div className="big tnum">392</div>
            <div className="mono" style={{ fontSize: 10.5, opacity:0.7 }}>
              ENTRIES · INDEXED · PRIVATE
            </div>
            <div style={{ marginTop:"auto", display:"flex", alignItems:"center", gap:8, fontFamily:"var(--font-mono)", fontSize:10.5 }}>
              <Icon name="eye" size={11} /> Memory is on
              <span style={{ marginLeft:"auto", textDecoration:"underline" }}>Manage</span>
            </div>
          </div>

          <div className="tile" style={{ gridColumn:"span 2" }}>
            <h3><Icon name="globe" size={10} /> Calendar · today</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:0, marginTop: 4 }}>
              {b.calendar.map((c, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"58px 1fr 80px", gap:12, padding:"10px 0", borderTop: i ? "0.5px solid var(--line-soft)" : "0" }}>
                  <div className="mono tnum" style={{ fontSize:12, color:"var(--ink)" }}>{c.t}</div>
                  <div style={{ fontSize:13 }}>{c.title}</div>
                  <div className="mono dim tnum" style={{ fontSize:10.5, textAlign:"right" }}>{c.dur}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tile">
            <h3><Icon name="ask" size={10} /> Inbox · highlights</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:0, marginTop: 4 }}>
              {b.inbox.map((c, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", gap:3, padding:"10px 0", borderTop: i ? "0.5px solid var(--line-soft)" : "0" }}>
                  <div className="mono dim" style={{ fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase" }}>{c.who}</div>
                  <div style={{ fontSize:12.5, lineHeight:1.35 }}>{c.txt}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tile" style={{ gridColumn: "span 3" }}>
            <h3><Icon name="bolt" size={10} /> Proactive · for you</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 14 }}>
              {[
                { kicker: "TIDY", body: "You have 14 tabs in Research about agents. Want me to group them?", cta: "Tidy them" },
                { kicker: "DEDUPE", body: "I found 3 near-duplicate PDFs about MCP. Keep the newest?", cta: "Review" },
                { kicker: "RELATED", body: "This morning's note 'Personas' is related to your search v2 spec.", cta: "Link them" },
              ].map((p, i) => (
                <div key={i} style={{ border:"0.5px solid var(--line-soft)", padding: 14 }}>
                  <div className="mono dim uppercase tiny" style={{ marginBottom: 10 }}>· {p.kicker}</div>
                  <div style={{ fontFamily:"var(--font-serif)", fontSize:18, lineHeight:1.3, marginBottom: 14 }}>{p.body}</div>
                  <button className="btn" style={{ height:24 }}>{p.cta} <Icon name="arrow" size={10} /></button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function MiniSparkline() {
  const pts = [12, 14, 11, 18, 16, 22, 20, 24, 19, 26, 30, 28, 34, 32, 40, 44, 38, 47];
  const max = Math.max(...pts);
  const w = 240, h = 32;
  const path = pts.map((p, i) => `${i ? "L" : "M"} ${(i / (pts.length - 1)) * w} ${h - (p / max) * h}`).join(" ");
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ marginTop:"auto" }}>
      <path d={path} stroke="var(--ink)" strokeWidth="1" fill="none" />
      <path d={path + ` L ${w} ${h} L 0 ${h} Z`} fill="var(--ink)" opacity="0.05" />
    </svg>
  );
}


// ─── Auto-Organization Feed (HERO) ──────────────────────────────────────
function ScreenOrganize() {
  const [items, setItems] = React.useState(() => SEED.feed.map(f => ({ ...f })));
  const [queue, setQueue] = React.useState(() => [...SEED.feedQueue]);
  const [paused, setPaused] = React.useState(false);
  const [buckets, setBuckets] = React.useState(() => SEED.buckets.map(b => ({ ...b })));

  const ts = React.useRef(null);
  React.useEffect(() => {
    if (paused) return undefined;
    let timeouts = [];
    function loop() {
      if (paused) return;
      // pull from queue
      const next = queue.shift();
      if (!next) {
        // refill from initial queue with new ids so it keeps flowing
        const more = SEED.feedQueue.map((q, i) => ({ ...q, id: q.id + "-r" + Date.now() + i }));
        setQueue([...more]);
        ts.current = setTimeout(loop, 2200);
        return;
      }
      // 1. Add as analyzing
      const incoming = { ...next, state: "incoming" };
      setItems(prev => [incoming, ...prev].slice(0, 14));
      // 2. After 700ms, analyze
      const a = setTimeout(() => {
        setItems(prev => prev.map(it => it.id === next.id ? { ...it, state: "analyzing" } : it));
      }, 700);
      // 3. After 2200ms, file
      const f = setTimeout(() => {
        setItems(prev => prev.map(it => it.id === next.id ? { ...it, state: "filed" } : it));
        setBuckets(prev => prev.map(b => b.name === next.bucket ? { ...b, count: b.count + 1, recent: [next.title, ...b.recent].slice(0, 2), pulse: true } : b));
        setTimeout(() => setBuckets(prev => prev.map(b => b.name === next.bucket ? { ...b, pulse: false } : b)), 700);
      }, 2200);
      timeouts.push(a, f);
      // schedule next
      ts.current = setTimeout(loop, 3000);
    }
    ts.current = setTimeout(loop, 1400);
    return () => {
      clearTimeout(ts.current);
      timeouts.forEach(clearTimeout);
    };
  }, [paused, queue]);

  const totalSaved = items.length + buckets.reduce((a, b) => a + b.count, 0);
  const maxBucket = Math.max(...buckets.map(b => b.count));

  return (
    <div className="page">
      <div className="feed-header">
        <div>
          <div className="mono uppercase tiny dim" style={{ marginBottom: 6 }}>· Auto-Organization · Live</div>
          <h1 style={{ margin: 0, fontSize: 28, fontFamily:"var(--font-sans)", fontWeight: 500, letterSpacing:"-0.01em" }}>
            Watching <em className="serif">Sterling</em> sort what you save.
          </h1>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap: 16 }}>
          <div className="feed-status">
            <span className="pulse"></span>
            {paused ? "Paused" : "Indexing"} · {buckets.length} buckets
          </div>
          <div className="seg">
            <button className={paused ? "" : "on"} onClick={() => setPaused(false)}>Live</button>
            <button className={paused ? "on" : ""} onClick={() => setPaused(true)}>Pause</button>
          </div>
          <button className="btn">
            <Icon name="filter" /> All sources
          </button>
        </div>
      </div>

      <div className="feed-grid">
        <div className="feed-stream">
          <div className="mono uppercase tiny dim" style={{ marginBottom: 4 }}>
            Incoming · captured, analyzed, filed · this session
          </div>
          {items.map(it => (
            <FeedItem key={it.id} item={it} />
          ))}
        </div>

        <div className="feed-buckets">
          <div className="mono uppercase tiny dim">Topics · auto-sorted · live counts</div>
          {buckets.sort((a,b) => b.count - a.count).map(b => (
            <div className={`bucket ${b.pulse ? "hot" : ""}`} key={b.id}>
              <h4>
                <span>{b.name}</span>
                <span className="ct tnum">{String(b.count).padStart(2,"0")}</span>
              </h4>
              <div className="bucket-bar">
                <i style={{ width: `${(b.count / maxBucket) * 100}%` }} />
              </div>
              <div className="recent">
                {b.recent.slice(0, 2).map((r, i) => (
                  <div key={i}>· {r}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedItem({ item }) {
  const tagBlock = item.state === "incoming" ? (
    <div className="tags" style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--ink-3)" }}>READING<span className="dots" style={{ display:"inline-block", width:18 }}></span></div>
  ) : item.state === "analyzing" ? (
    <div className="tags" style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"var(--ink)" }}>
      <span style={{ background:"var(--ink)", color:"var(--bg)", padding:"2px 5px", letterSpacing:"0.06em" }}>
        ANALYZING<span className="dots" style={{ display:"inline-block", width:18 }}></span>
      </span>
    </div>
  ) : (
    <div className="tags">
      {item.tags.slice(0, 2).map((t, i) => <Chip key={i} kind={i === 0 ? "bold" : "default"}>{t}</Chip>)}
      <Chip kind="accent">→ {item.bucket}</Chip>
    </div>
  );

  return (
    <div className={`feed-item ${item.state}`} data-state={item.state}>
      <div className="ico">{item.type}</div>
      <div>
        <div className="ttl">{item.title}</div>
        <div className="sub">
          <span>{item.src}</span>
          <span style={{ color: "var(--ink-4)" }}>·</span>
          <span>{item.state === "filed" ? "FILED · now" : item.state === "analyzing" ? "ANALYZING" : "INCOMING"}</span>
        </div>
      </div>
      {tagBlock}
    </div>
  );
}


// ─── Library (grid + list) ──────────────────────────────────────────────
function ScreenLibrary({ view, setView, density }) {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { id: "all",       label: "All",       count: SEED.items.length },
    { id: "link",      label: "Links",     count: SEED.items.filter(i => i.type === "link").length },
    { id: "pdf",       label: "PDFs",      count: SEED.items.filter(i => i.type === "pdf").length },
    { id: "image",     label: "Images",    count: SEED.items.filter(i => i.type === "image" || i.type === "screenshot").length },
    { id: "video",     label: "Video",     count: SEED.items.filter(i => i.type === "video").length },
    { id: "audio",     label: "Audio",     count: SEED.items.filter(i => i.type === "audio").length },
    { id: "note",      label: "Notes",     count: SEED.items.filter(i => i.type === "note").length },
  ];
  const items = filter === "all" ? SEED.items :
    filter === "image" ? SEED.items.filter(i => i.type === "image" || i.type === "screenshot") :
    SEED.items.filter(i => i.type === filter);

  return (
    <div className="page">
      <PageHeader
        kicker="Library"
        title="Everything you've"
        em="kept."
        sub={`${SEED.items.length} items · sorted by date · last save 2h ago`}
        actions={
          <>
            <button className="btn ghost"><Icon name="filter" /> Filter</button>
            <button className="btn"><Icon name="upload" /> Upload</button>
          </>
        }
      />

      <div className="filter-rail">
        {filters.map(f => (
          <button key={f.id}
            className={`chip ${filter === f.id ? "solid" : ""}`}
            style={{ cursor:"pointer", border:0, padding:"4px 10px", fontSize:11 }}
            onClick={() => setFilter(f.id)}>
            {f.label} <span className="tnum dim" style={{ marginLeft:6, opacity:0.65 }}>{f.count}</span>
          </button>
        ))}
        <div style={{ flex:1 }}></div>
        <div className="seg">
          <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")}><Icon name="grid" size={11} /> Grid</button>
          <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}><Icon name="list" size={11} /> List</button>
        </div>
      </div>

      <div className="page-body">
        {view === "grid" ? (
          <div className="lib-grid">
            {items.map(it => <ItemCard key={it.id} item={it} />)}
          </div>
        ) : (
          <div className="lib-list">
            <div className="lib-list-h">
              <div></div>
              <div>Title</div>
              <div>Tags</div>
              <div>Topic</div>
              <div style={{ textAlign:"right" }}>Saved</div>
              <div></div>
            </div>
            {items.map(it => <ItemRow key={it.id} item={it} />)}
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Topics (AI auto-folders) ───────────────────────────────────────────
function ScreenTopics() {
  const grouped = SEED.topics.reduce((acc, t) => {
    (acc[t.parent] ||= []).push(t);
    return acc;
  }, {});
  return (
    <div className="page">
      <PageHeader
        kicker="By meaning · AI"
        title="Topics that"
        em="emerged."
        sub={`${SEED.topics.length} auto-generated folders · ${SEED.topics.reduce((a,t)=>a+t.count,0)} items organized · you can override anything`}
        actions={
          <>
            <button className="btn ghost"><Icon name="sparkle" /> Suggest new</button>
            <button className="btn"><Icon name="plus" /> New folder</button>
          </>
        }
      />
      <div className="page-body" style={{ display:"flex", flexDirection:"column", gap: 28 }}>
        {Object.entries(grouped).map(([parent, list]) => (
          <div key={parent}>
            <div style={{ display:"flex", alignItems:"baseline", gap: 12, marginBottom: 12, paddingBottom: 8, borderBottom: "0.5px solid var(--line-soft)" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize: 11, letterSpacing:"0.12em", textTransform: "uppercase", color:"var(--ink)" }}>
                {parent}
              </div>
              <div className="mono dim tnum" style={{ fontSize: 10.5 }}>
                · {list.length} folders · {list.reduce((a,t)=>a+t.count,0)} items
              </div>
            </div>
            <div className="topic-grid">
              {list.map(t => <TopicCard key={t.id} topic={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicCard({ topic }) {
  // bright accent on the highest-count topic in each group is overkill; pick a few hot ones by name
  const hot = ["AI Browsers","Guitar Samples","Design Systems"].includes(topic.name);
  return (
    <div className="topic-card" style={hot ? { background:"var(--ink)", color:"var(--bg)", borderColor:"var(--ink)" } : {}}>
      <div className="h">
        <div className="mono uppercase tiny" style={{ color: hot ? "var(--accent)" : "var(--ink-3)" }}>{topic.parent}</div>
        <div className="mono tnum" style={{ fontSize: 11, color: hot ? "var(--ink-4)" : "var(--ink-2)" }}>
          {String(topic.count).padStart(2, "0")}
        </div>
      </div>
      <div className="n" style={{ color: hot ? "var(--bg)" : "var(--ink)" }}>
        {topic.name}
      </div>
      <div>
        <div className="subs">
          {topic.subs.map(s => (
            <span key={s} className="chip" style={{
              borderColor: hot ? "rgba(255,255,255,0.2)" : "var(--line-soft)",
              background: hot ? "transparent" : "var(--bg)",
              color: hot ? "var(--bg)" : "var(--ink-2)"
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenDashboard, ScreenOrganize, ScreenLibrary, ScreenTopics,
});
