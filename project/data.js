// data.js — seed data for STERLING SEARCH prototype
// Mixed user persona: designer/researcher dabbling in music + product work

window.SEED = (() => {
  const T = (h, m = 0) => {
    const d = new Date();
    d.setHours(d.getHours() - h, d.getMinutes() - m);
    return d;
  };
  const tFmt = (d) => {
    const diff = (Date.now() - d.getTime()) / 60000;
    if (diff < 1) return "now";
    if (diff < 60) return Math.round(diff) + "m";
    if (diff < 60 * 24) return Math.round(diff / 60) + "h";
    return Math.round(diff / 60 / 24) + "d";
  };

  // ── topics (auto-generated) ─────────────────────────────────────
  const topics = [
    { id: "ai-browsers",    name: "AI Browsers",        parent: "AI",          count: 38, subs: ["Arc", "Dia", "Comet", "FAZM", "Agents"] },
    { id: "ai-agents",      name: "Autonomous Agents",  parent: "AI",          count: 24, subs: ["MCP", "Computer Use", "Browser", "Benchmarks"] },
    { id: "ai-productivity",name: "AI Productivity",    parent: "AI",          count: 17, subs: ["Note-taking", "Email", "Search"] },
    { id: "second-brain",   name: "Second Brain",       parent: "Knowledge",   count: 29, subs: ["PKM", "Obsidian", "Memory", "Recall"] },
    { id: "design-systems", name: "Design Systems",     parent: "Design",      count: 22, subs: ["Tokens", "Typography", "Components"] },
    { id: "typography",     name: "Typography",         parent: "Design",      count: 14, subs: ["Display", "Mono", "Editorial"] },
    { id: "guitar-samples", name: "Guitar Samples",     parent: "Music",       count: 41, subs: ["Clean", "Dirty", "Ambient", "90–100 BPM"] },
    { id: "drum-loops",     name: "Drum Loops",         parent: "Music",       count: 33, subs: ["Boom Bap", "Breakbeat", "Lo-Fi"] },
    { id: "product-specs",  name: "Product Specs",      parent: "Work",        count: 19, subs: ["PRD", "RFC", "Roadmap"] },
    { id: "github",         name: "GitHub",             parent: "Work",        count: 27, subs: ["PRs", "Issues", "Releases"] },
    { id: "meeting-notes",  name: "Meeting Notes",      parent: "Work",        count: 12, subs: ["1:1", "Standup", "Strategy"] },
    { id: "longreads",      name: "Long Reads",         parent: "Reading",     count: 31, subs: ["Essays", "Profiles", "Stripe Press"] },
    { id: "interviews",     name: "Interview Notes",    parent: "Research",    count: 8,  subs: ["Users", "Customer Dev"] },
    { id: "city-eats",      name: "City Eats",          parent: "Life",        count: 11, subs: ["NYC", "Tokyo", "Lisbon"] },
  ];

  // ── saved items ─────────────────────────────────────────────────
  const items = [
    { id: "i01", type: "link",       title: "How Arc Browser thinks about Spaces vs. tabs", source: "thebrowser.company", url: "thebrowser.company/spaces", topics: ["ai-browsers"], tags: ["browser","UX","spaces"], when: tFmt(T(2)), color: "#F0FF31", shape: "doc" },
    { id: "i02", type: "pdf",        title: "The Memex revisited — V. Bush, annotated", source: "PDF · 18p", url: "", topics: ["second-brain","longreads"], tags: ["memex","PKM","essay"], when: tFmt(T(3)), color: "#FFFFFF", shape: "pdf" },
    { id: "i03", type: "image",      title: "Mood — editorial mono UI capture", source: "screenshot", url: "", topics: ["design-systems"], tags: ["editorial","mono","mood"], when: tFmt(T(4)), color: "#111", shape: "img" },
    { id: "i04", type: "audio",      title: "GTR_clean_loop_96bpm_E.wav", source: "audio · 0:24", url: "", topics: ["guitar-samples"], tags: ["96 BPM","clean","E minor"], when: tFmt(T(6)), color: "#FF6A1F", shape: "wave" },
    { id: "i05", type: "link",       title: "MCP — a protocol for tool-using agents", source: "modelcontextprotocol.io", url: "", topics: ["ai-agents"], tags: ["MCP","spec","protocol"], when: tFmt(T(7)), color: "#7A5AF8", shape: "doc" },
    { id: "i06", type: "note",       title: "Weekly review · Apr W3 — what shipped, what slipped", source: "note", url: "", topics: ["meeting-notes"], tags: ["review","Q2","status"], when: tFmt(T(8)), color: "#FAFAF7", shape: "note" },
    { id: "i07", type: "video",      title: "Talking with Karri — Arc was always for me, not us", source: "youtube · 38:21", url: "", topics: ["ai-browsers","interviews"], tags: ["arc","interview"], when: tFmt(T(10)), color: "#0A0A0A", shape: "play" },
    { id: "i08", type: "link",       title: "Why second-brain apps mostly fail at recall", source: "essay · 14m", url: "", topics: ["second-brain"], tags: ["essay","recall","critique"], when: tFmt(T(12)), color: "#F0FF31", shape: "doc" },
    { id: "i09", type: "image",      title: "Diatype specimen — alt mono setting", source: "Dinamo", url: "", topics: ["typography","design-systems"], tags: ["specimen","mono","Dinamo"], when: tFmt(T(14)), color: "#FFFFFF", shape: "img" },
    { id: "i10", type: "pdf",        title: "Roadmap Q3 — search & memory v2", source: "PDF · 6p", url: "", topics: ["product-specs"], tags: ["roadmap","Q3","memory"], when: tFmt(T(20)), color: "#FAFAF7", shape: "pdf" },
    { id: "i11", type: "audio",      title: "DRM_breakbeat_94bpm_dry.wav", source: "audio · 0:32", url: "", topics: ["drum-loops"], tags: ["94 BPM","breakbeat","dry"], when: tFmt(T(22)), color: "#FF6A1F", shape: "wave" },
    { id: "i12", type: "link",       title: "Pieces OS — long-term memory for developers", source: "pieces.app", url: "", topics: ["second-brain","ai-productivity"], tags: ["LTM","memory","dev"], when: tFmt(T(26)), color: "#00E0FF", shape: "doc" },
    { id: "i13", type: "image",      title: "Whiteboard photo — search v2 information arch", source: "iphone capture", url: "", topics: ["product-specs"], tags: ["IA","whiteboard","sketch"], when: tFmt(T(28)), color: "#FFFFFF", shape: "img" },
    { id: "i14", type: "link",       title: "Why we picked pgvector over Pinecone (writeup)", source: "supabase.com", url: "", topics: ["github","ai-agents"], tags: ["pgvector","infra","postgres"], when: tFmt(T(30)), color: "#1B6E3A", shape: "doc" },
    { id: "i15", type: "pdf",        title: "Stripe Atlas — semantic search architecture", source: "PDF · 22p", url: "", topics: ["longreads","ai-agents"], tags: ["semantic","arch","essay"], when: tFmt(T(40)), color: "#FAFAF7", shape: "pdf" },
    { id: "i16", type: "video",      title: "Dia demo — typing intent, not URLs", source: "youtube · 4:12", url: "", topics: ["ai-browsers"], tags: ["dia","demo","intent"], when: tFmt(T(46)), color: "#0A0A0A", shape: "play" },
    { id: "i17", type: "screenshot", title: "Mymind — capture pile, before and after", source: "screenshot", url: "", topics: ["second-brain","design-systems"], tags: ["mymind","capture","UI"], when: tFmt(T(52)), color: "#EDEBE3", shape: "img" },
    { id: "i18", type: "note",       title: "Personas — who is Sterling really for?", source: "note", url: "", topics: ["product-specs","interviews"], tags: ["personas","positioning"], when: tFmt(T(58)), color: "#FAFAF7", shape: "note" },
    { id: "i19", type: "audio",      title: "GTR_dirty_96bpm_Bb.wav", source: "audio · 0:18", url: "", topics: ["guitar-samples"], tags: ["96 BPM","dirty","Bb"], when: tFmt(T(70)), color: "#FF6A1F", shape: "wave" },
    { id: "i20", type: "link",       title: "Bento — Japanese composition in Western interfaces", source: "essay · 11m", url: "", topics: ["typography","design-systems"], tags: ["composition","bento","essay"], when: tFmt(T(74)), color: "#F0FF31", shape: "doc" },
    { id: "i21", type: "link",       title: "GitHub PR #482 — wire vector embeddings into capture", source: "github.com", url: "", topics: ["github"], tags: ["PR","embeddings","capture"], when: tFmt(T(76)), color: "#0A0A0A", shape: "doc" },
    { id: "i22", type: "image",      title: "Tile spread — mono brutalist refs (12 images)", source: "are.na", url: "", topics: ["design-systems","typography"], tags: ["are.na","mono","grid"], when: tFmt(T(86)), color: "#FFFFFF", shape: "img" },
    { id: "i23", type: "pdf",        title: "Interview · D. (PM at Stripe) — what they save & forget", source: "PDF · 3p", url: "", topics: ["interviews"], tags: ["interview","PM"], when: tFmt(T(90)), color: "#FAFAF7", shape: "pdf" },
    { id: "i24", type: "link",       title: "Raindrop API — what we can/can't import", source: "developer.raindrop.io", url: "", topics: ["github","product-specs"], tags: ["import","API","raindrop"], when: tFmt(T(96)), color: "#1B6E3A", shape: "doc" },
  ];

  // ── feed events (auto-organization stream) ───────────────────────
  // 6 pre-loaded "filed" items + a queue that will animate in
  const feed = [
    { id: "f01", state: "filed", title: "How Arc Browser thinks about Spaces vs. tabs", src: "thebrowser.company · link", type: "LINK", tags: ["ai-browsers","UX"], bucket: "AI Browsers" },
    { id: "f02", state: "filed", title: "GTR_clean_loop_96bpm_E.wav", src: "audio · 0:24", type: "WAV", tags: ["guitar","96 BPM"], bucket: "Guitar Samples" },
    { id: "f03", state: "filed", title: "MCP — a protocol for tool-using agents", src: "modelcontextprotocol.io", type: "LINK", tags: ["MCP","protocol"], bucket: "Autonomous Agents" },
    { id: "f04", state: "filed", title: "Mymind — capture pile, before and after", src: "screenshot", type: "PNG", tags: ["mymind","UI"], bucket: "Design Systems" },
    { id: "f05", state: "filed", title: "Roadmap Q3 — search & memory v2", src: "PDF · 6p", type: "PDF", tags: ["roadmap","Q3"], bucket: "Product Specs" },
    { id: "f06", state: "filed", title: "Pieces OS — long-term memory for developers", src: "pieces.app · link", type: "LINK", tags: ["LTM","memory"], bucket: "Second Brain" },
  ];
  const feedQueue = [
    { id: "f07", title: "Diatype specimen — alt mono setting", src: "dinamo.com · screenshot", type: "PNG", tags: ["specimen","mono","Dinamo"], bucket: "Typography" },
    { id: "f08", title: "DRM_breakbeat_94bpm_dry.wav", src: "audio · 0:32", type: "WAV", tags: ["94 BPM","breakbeat"], bucket: "Drum Loops" },
    { id: "f09", title: "Why second-brain apps mostly fail at recall", src: "essay · 14m read", type: "LINK", tags: ["essay","critique"], bucket: "Second Brain" },
    { id: "f10", title: "Dia demo — typing intent, not URLs", src: "youtube · 4:12", type: "MP4", tags: ["dia","demo"], bucket: "AI Browsers" },
    { id: "f11", title: "Bento — Japanese composition in Western interfaces", src: "essay · 11m", type: "LINK", tags: ["bento","essay"], bucket: "Typography" },
    { id: "f12", title: "GTR_dirty_96bpm_Bb.wav", src: "audio · 0:18", type: "WAV", tags: ["96 BPM","dirty"], bucket: "Guitar Samples" },
    { id: "f13", title: "GitHub PR #482 — wire vector embeddings into capture", src: "github.com", type: "LINK", tags: ["PR","embeddings"], bucket: "GitHub" },
    { id: "f14", title: "Personas — who is Sterling really for?", src: "note · draft", type: "NOTE", tags: ["personas"], bucket: "Product Specs" },
  ];

  // ── feed bucket sidebar (live counts, in alignment with feed) ────
  const buckets = [
    { id: "ai-browsers",    name: "AI Browsers",      count: 12, recent: ["Arc — Spaces vs tabs", "Dia demo — typing intent"], hot: true },
    { id: "ai-agents",      name: "Autonomous Agents",count: 8,  recent: ["MCP — tool-using agents"] },
    { id: "guitar-samples", name: "Guitar Samples",   count: 14, recent: ["GTR_clean_96bpm_E", "GTR_dirty_96bpm_Bb"] },
    { id: "drum-loops",     name: "Drum Loops",       count: 9,  recent: ["DRM_breakbeat_94bpm_dry"] },
    { id: "design-systems", name: "Design Systems",   count: 11, recent: ["Mymind — capture pile"] },
    { id: "typography",     name: "Typography",       count: 6,  recent: ["Diatype specimen", "Bento — composition"] },
    { id: "product-specs",  name: "Product Specs",    count: 7,  recent: ["Roadmap Q3", "Personas"] },
    { id: "second-brain",   name: "Second Brain",     count: 10, recent: ["Pieces OS", "Recall critique"] },
    { id: "github",         name: "GitHub",           count: 5,  recent: ["PR #482 — embeddings"] },
  ];

  // ── spaces / tabs ────────────────────────────────────────────────
  const spaces = [
    {
      id: "research",
      name: "Research",
      color: "#F0FF31",
      pinned: [
        { fav: "P", t: "Perplexity",            u: "perplexity.ai" },
        { fav: "S", t: "Semantic Scholar",      u: "semanticscholar.org" },
        { fav: "A", t: "Are.na — mono refs",    u: "are.na/serenity/mono-refs" },
        { fav: "G", t: "Google Scholar",        u: "scholar.google.com" },
      ],
      groups: [
        { name: "AI Browsers", color: "var(--accent)", tabs: [
          { fav: "T", t: "The Browser Company — Arc was always for me", u: "thebrowser.company" },
          { fav: "D", t: "Dia by The Browser Company",                  u: "diabrowser.com" },
          { fav: "C", t: "Comet — agent-native browser",                u: "comet.app" },
        ]},
        { name: "Agents", color: "#7A5AF8", tabs: [
          { fav: "M", t: "MCP specification",                            u: "modelcontextprotocol.io" },
          { fav: "F", t: "FAZM computer-use agent",                     u: "fazm.ai/agent" },
          { fav: "B", t: "browseragents.dev benchmark",                 u: "browseragents.dev" },
        ]},
        { name: "Second Brain", color: "#00E0FF", tabs: [
          { fav: "P", t: "Pieces — long-term memory",                   u: "pieces.app" },
          { fav: "M", t: "MyMind — what saving should feel like",       u: "mymind.com" },
          { fav: "O", t: "Obsidian — local-first knowledge",            u: "obsidian.md" },
        ]},
      ],
      archived: [
        { fav: "R", t: "Raindrop.io — bookmark manager", u: "raindrop.io", arch: "2d" },
        { fav: "N", t: "Notion AI — capture demo",       u: "notion.so", arch: "5d" },
      ]
    },
    {
      id: "work",
      name: "Work",
      color: "#0A0A0A",
      pinned: [
        { fav: "L", t: "Linear",       u: "linear.app/sterling" },
        { fav: "G", t: "GitHub",       u: "github.com/sterling-search" },
        { fav: "N", t: "Notion",       u: "notion.so/sterling" },
        { fav: "S", t: "Slack",        u: "sterling.slack.com" },
      ],
      groups: [
        { name: "PRs in review", color: "var(--ok)", tabs: [
          { fav: "#", t: "#482 wire vector embeddings into capture",    u: "github.com/sterling-search/app/pull/482" },
          { fav: "#", t: "#481 collapse memory & saved into one schema",u: "github.com/sterling-search/app/pull/481" },
          { fav: "#", t: "#479 brutalist mono pass on Library",         u: "github.com/sterling-search/app/pull/479" },
        ]},
        { name: "Specs", color: "#F0FF31", tabs: [
          { fav: "N", t: "Notion — Q3 roadmap",                         u: "notion.so/sterling/q3" },
          { fav: "N", t: "Notion — Sterling memory v2 RFC",             u: "notion.so/sterling/memory-v2" },
        ]},
      ],
      archived: []
    },
    {
      id: "music",
      name: "Music",
      color: "#FF6A1F",
      pinned: [
        { fav: "S", t: "Splice",       u: "splice.com" },
        { fav: "L", t: "Loopcloud",    u: "loopcloud.com" },
        { fav: "B", t: "Bandcamp",     u: "bandcamp.com" },
      ],
      groups: [
        { name: "Tonight's session", color: "var(--accent)", tabs: [
          { fav: "S", t: "Splice — 96 BPM E minor guitar loops",        u: "splice.com/sounds/search?bpm=96" },
          { fav: "Y", t: "Youtube — Boom bap drum tutorial",            u: "youtube.com" },
        ]},
      ],
      archived: []
    },
    {
      id: "life",
      name: "Life",
      color: "#1B6E3A",
      pinned: [
        { fav: "G", t: "Gmail",        u: "mail.google.com" },
        { fav: "C", t: "Calendar",     u: "calendar.google.com" },
      ],
      groups: [
        { name: "Tokyo — May", color: "var(--accent)", tabs: [
          { fav: "T", t: "Tabelog — Daikanyama",                        u: "tabelog.com" },
          { fav: "A", t: "Airbnb — Shimokita",                          u: "airbnb.com" },
        ]},
      ],
      archived: []
    },
  ];

  // ── memory entries ───────────────────────────────────────────────
  const memories = [
    { when: "Today · 09:14", txt: "Decided to keep capture inbox separate from auto-filed library — the user wants to see what just came in before it disappears into folders.", src: "from note · 'Personas'" },
    { when: "Today · 08:42", txt: "Working on Sterling Search memory v2 — primary question is whether to embed everything or only what the user opens twice.", src: "you added" },
    { when: "Yesterday",     txt: "Prefers mono-only typography for product UI; reserves serif for AI-generated long-form (assistant answers, summaries).", src: "auto · pattern" },
    { when: "Yesterday",     txt: "Researching AI browsers; Arc/Dia/Comet are the three benchmarks. Has skeptical priors about agents acting without confirmation.", src: "auto · 14 saves" },
    { when: "2 days ago",    txt: "Guitar sessions cluster around 90–100 BPM. E minor and Bb most-saved keys.", src: "auto · 23 saves" },
    { when: "3 days ago",    txt: "Don't summarize meeting notes automatically — wants to read the raw transcript first and tag it themselves.", src: "you said" },
    { when: "1 week ago",    txt: "Email and calendar should be readable but not indexed for AI memory — privacy preference.", src: "settings" },
  ];

  // ── agent tasks ──────────────────────────────────────────────────
  const tasks = [
    { ttl: "Find and dedupe my saved AI browser articles",  step: "step 6 / 7", pg: 86, stat: "running", state: "running" },
    { ttl: "Compile a one-page report on MCP servers",       step: "step 3 / 5", pg: 60, stat: "running", state: "running" },
    { ttl: "Pull every Stripe Press long-read into Library", step: "done",       pg: 100,stat: "done",    state: "done" },
    { ttl: "Tidy the 23 tabs in Work · cleanup yesterday",   step: "done",       pg: 100,stat: "done",    state: "done" },
    { ttl: "Watch are.na for new mono brutalist boards",     step: "queued",     pg: 0,  stat: "queued",  state: "queued" },
    { ttl: "Summarize this week's GitHub PR activity",       step: "queued",     pg: 0,  stat: "queued",  state: "queued" },
  ];

  // ── brief / dashboard ────────────────────────────────────────────
  const brief = {
    greeting: "Thursday · May 15",
    priorities: [
      "Ship Sterling memory v2 RFC before standup.",
      "Listen to the 4 unreviewed guitar loops in Inbox.",
      "Reply to D. about the PM interview notes.",
    ],
    calendar: [
      { t: "10:00", title: "Sterling standup",         dur: "20m" },
      { t: "11:30", title: "1:1 with E. — search v2",  dur: "45m" },
      { t: "14:00", title: "PM interview · D. (Stripe)",dur: "45m" },
      { t: "16:00", title: "Studio time — 90 BPM session", dur: "2h" },
    ],
    inbox: [
      { who: "Notion",  txt: "E. left 4 comments on memory v2 RFC" },
      { who: "GitHub",  txt: "PR #482 ready for re-review" },
      { who: "Slack · #design", txt: "Karri shared a brutalist mood board" },
    ],
    counts: { saved: 1284, this_week: 47, this_month: 184, memory: 392 }
  };

  return { topics, items, feed, feedQueue, buckets, spaces, memories, tasks, brief };
})();
