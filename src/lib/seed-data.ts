// Seed data for Sterling Search prototype / fallback when DB is empty

export const SEED_TOPICS = [
  { id: "ai-browsers",     name: "AI Browsers",        parent: "AI",          count: 38, subs: ["Arc", "Dia", "Comet", "FAZM", "Agents"] },
  { id: "ai-agents",       name: "Autonomous Agents",  parent: "AI",          count: 24, subs: ["MCP", "Computer Use", "Browser", "Benchmarks"] },
  { id: "ai-productivity", name: "AI Productivity",    parent: "AI",          count: 17, subs: ["Note-taking", "Email", "Search"] },
  { id: "second-brain",    name: "Second Brain",        parent: "Knowledge",   count: 29, subs: ["PKM", "Obsidian", "Memory", "Recall"] },
  { id: "design-systems",  name: "Design Systems",      parent: "Design",      count: 22, subs: ["Tokens", "Typography", "Components"] },
  { id: "typography",      name: "Typography",          parent: "Design",      count: 14, subs: ["Display", "Mono", "Editorial"] },
  { id: "guitar-samples",  name: "Guitar Samples",      parent: "Music",       count: 41, subs: ["Clean", "Dirty", "Ambient", "90–100 BPM"] },
  { id: "drum-loops",      name: "Drum Loops",          parent: "Music",       count: 33, subs: ["Boom Bap", "Breakbeat", "Lo-Fi"] },
  { id: "product-specs",   name: "Product Specs",       parent: "Work",        count: 19, subs: ["PRD", "RFC", "Roadmap"] },
  { id: "github",          name: "GitHub",              parent: "Work",        count: 27, subs: ["PRs", "Issues", "Releases"] },
  { id: "meeting-notes",   name: "Meeting Notes",       parent: "Work",        count: 12, subs: ["1:1", "Standup", "Strategy"] },
  { id: "longreads",       name: "Long Reads",          parent: "Reading",     count: 31, subs: ["Essays", "Profiles", "Stripe Press"] },
  { id: "interviews",      name: "Interview Notes",     parent: "Research",    count: 8,  subs: ["Users", "Customer Dev"] },
  { id: "city-eats",       name: "City Eats",           parent: "Life",        count: 11, subs: ["NYC", "Tokyo", "Lisbon"] },
];

export const SEED_ITEMS = [
  { id: "i01", type: "link",       title: "How Arc Browser thinks about Spaces vs. tabs",           source: "thebrowser.company",    url: "https://thebrowser.company/spaces", topics: ["ai-browsers"],                tags: ["browser","UX","spaces"],            color: "#F0FF31" },
  { id: "i02", type: "pdf",        title: "The Memex revisited — V. Bush, annotated",               source: "PDF · 18p",             url: "",                                  topics: ["second-brain","longreads"],    tags: ["memex","PKM","essay"],             color: "#FFFFFF" },
  { id: "i03", type: "image",      title: "Mood — editorial mono UI capture",                       source: "screenshot",            url: "",                                  topics: ["design-systems"],              tags: ["editorial","mono","mood"],         color: "#111" },
  { id: "i04", type: "audio",      title: "GTR_clean_loop_96bpm_E.wav",                             source: "audio · 0:24",          url: "",                                  topics: ["guitar-samples"],              tags: ["96 BPM","clean","E minor"],        color: "#FF6A1F" },
  { id: "i05", type: "link",       title: "MCP — a protocol for tool-using agents",                 source: "modelcontextprotocol.io",url: "",                                 topics: ["ai-agents"],                   tags: ["MCP","spec","protocol"],           color: "#7A5AF8" },
  { id: "i06", type: "note",       title: "Weekly review · Apr W3 — what shipped, what slipped",   source: "note",                  url: "",                                  topics: ["meeting-notes"],               tags: ["review","Q2","status"],            color: "#FAFAF7" },
  { id: "i07", type: "video",      title: "Talking with Karri — Arc was always for me, not us",     source: "youtube · 38:21",       url: "",                                  topics: ["ai-browsers","interviews"],    tags: ["arc","interview"],                 color: "#0A0A0A" },
  { id: "i08", type: "link",       title: "Why second-brain apps mostly fail at recall",            source: "essay · 14m",           url: "",                                  topics: ["second-brain"],                tags: ["essay","recall","critique"],       color: "#F0FF31" },
  { id: "i09", type: "image",      title: "Diatype specimen — alt mono setting",                    source: "Dinamo",                url: "",                                  topics: ["typography","design-systems"], tags: ["specimen","mono","Dinamo"],        color: "#FFFFFF" },
  { id: "i10", type: "pdf",        title: "Roadmap Q3 — search & memory v2",                        source: "PDF · 6p",              url: "",                                  topics: ["product-specs"],               tags: ["roadmap","Q3","memory"],           color: "#FAFAF7" },
  { id: "i11", type: "audio",      title: "DRM_breakbeat_94bpm_dry.wav",                            source: "audio · 0:32",          url: "",                                  topics: ["drum-loops"],                  tags: ["94 BPM","breakbeat","dry"],        color: "#FF6A1F" },
  { id: "i12", type: "link",       title: "Pieces OS — long-term memory for developers",            source: "pieces.app",            url: "",                                  topics: ["second-brain","ai-productivity"],tags: ["LTM","memory","dev"],            color: "#00E0FF" },
  { id: "i13", type: "image",      title: "Whiteboard photo — search v2 information arch",          source: "iphone capture",        url: "",                                  topics: ["product-specs"],               tags: ["IA","whiteboard","sketch"],        color: "#FFFFFF" },
  { id: "i14", type: "link",       title: "Why we picked pgvector over Pinecone (writeup)",         source: "supabase.com",          url: "",                                  topics: ["github","ai-agents"],          tags: ["pgvector","infra","postgres"],     color: "#1B6E3A" },
  { id: "i15", type: "pdf",        title: "Stripe Atlas — semantic search architecture",             source: "PDF · 22p",             url: "",                                  topics: ["longreads","ai-agents"],       tags: ["semantic","arch","essay"],         color: "#FAFAF7" },
  { id: "i16", type: "video",      title: "Dia demo — typing intent, not URLs",                     source: "youtube · 4:12",        url: "",                                  topics: ["ai-browsers"],                 tags: ["dia","demo","intent"],             color: "#0A0A0A" },
  { id: "i17", type: "screenshot", title: "Mymind — capture pile, before and after",                source: "screenshot",            url: "",                                  topics: ["second-brain","design-systems"],tags: ["mymind","capture","UI"],          color: "#EDEBE3" },
  { id: "i18", type: "note",       title: "Personas — who is Sterling really for?",                 source: "note",                  url: "",                                  topics: ["product-specs","interviews"],  tags: ["personas","positioning"],          color: "#FAFAF7" },
  { id: "i19", type: "audio",      title: "GTR_dirty_96bpm_Bb.wav",                                 source: "audio · 0:18",          url: "",                                  topics: ["guitar-samples"],              tags: ["96 BPM","dirty","Bb"],             color: "#FF6A1F" },
  { id: "i20", type: "link",       title: "Bento — Japanese composition in Western interfaces",     source: "essay · 11m",           url: "",                                  topics: ["typography","design-systems"], tags: ["composition","bento","essay"],     color: "#F0FF31" },
  { id: "i21", type: "link",       title: "GitHub PR #482 — wire vector embeddings into capture",  source: "github.com",            url: "",                                  topics: ["github"],                      tags: ["PR","embeddings","capture"],       color: "#0A0A0A" },
  { id: "i22", type: "image",      title: "Tile spread — mono brutalist refs (12 images)",          source: "are.na",                url: "",                                  topics: ["design-systems","typography"], tags: ["are.na","mono","grid"],            color: "#FFFFFF" },
  { id: "i23", type: "pdf",        title: "Interview · D. (PM at Stripe) — what they save & forget",source: "PDF · 3p",             url: "",                                  topics: ["interviews"],                  tags: ["interview","PM"],                  color: "#FAFAF7" },
  { id: "i24", type: "link",       title: "Raindrop API — what we can/can't import",                source: "developer.raindrop.io", url: "",                                  topics: ["github","product-specs"],      tags: ["import","API","raindrop"],         color: "#1B6E3A" },
];

export const SEED_FEED = [
  { id: "f01", state: "filed", title: "How Arc Browser thinks about Spaces vs. tabs",  src: "thebrowser.company · link", type: "LINK", tags: ["ai-browsers","UX"],     bucket: "AI Browsers" },
  { id: "f02", state: "filed", title: "GTR_clean_loop_96bpm_E.wav",                    src: "audio · 0:24",              type: "WAV",  tags: ["guitar","96 BPM"],     bucket: "Guitar Samples" },
  { id: "f03", state: "filed", title: "MCP — a protocol for tool-using agents",         src: "modelcontextprotocol.io",   type: "LINK", tags: ["MCP","protocol"],      bucket: "Autonomous Agents" },
  { id: "f04", state: "filed", title: "Mymind — capture pile, before and after",        src: "screenshot",                type: "PNG",  tags: ["mymind","UI"],         bucket: "Design Systems" },
  { id: "f05", state: "filed", title: "Roadmap Q3 — search & memory v2",                src: "PDF · 6p",                  type: "PDF",  tags: ["roadmap","Q3"],        bucket: "Product Specs" },
  { id: "f06", state: "filed", title: "Pieces OS — long-term memory for developers",    src: "pieces.app · link",         type: "LINK", tags: ["LTM","memory"],        bucket: "Second Brain" },
];

export const SEED_FEED_QUEUE = [
  { id: "f07", title: "Diatype specimen — alt mono setting",                    src: "dinamo.com · screenshot",   type: "PNG",  tags: ["specimen","mono"],     bucket: "Typography" },
  { id: "f08", title: "DRM_breakbeat_94bpm_dry.wav",                            src: "audio · 0:32",              type: "WAV",  tags: ["94 BPM","breakbeat"],  bucket: "Drum Loops" },
  { id: "f09", title: "Why second-brain apps mostly fail at recall",            src: "essay · 14m read",          type: "LINK", tags: ["essay","critique"],    bucket: "Second Brain" },
  { id: "f10", title: "Dia demo — typing intent, not URLs",                     src: "youtube · 4:12",            type: "MP4",  tags: ["dia","demo"],          bucket: "AI Browsers" },
  { id: "f11", title: "Bento — Japanese composition in Western interfaces",     src: "essay · 11m",               type: "LINK", tags: ["bento","essay"],       bucket: "Typography" },
  { id: "f12", title: "GTR_dirty_96bpm_Bb.wav",                                 src: "audio · 0:18",              type: "WAV",  tags: ["96 BPM","dirty"],      bucket: "Guitar Samples" },
  { id: "f13", title: "GitHub PR #482 — wire vector embeddings into capture",  src: "github.com",                type: "LINK", tags: ["PR","embeddings"],     bucket: "GitHub" },
  { id: "f14", title: "Personas — who is Sterling really for?",                 src: "note · draft",              type: "NOTE", tags: ["personas"],            bucket: "Product Specs" },
];

export const SEED_BUCKETS = [
  { id: "ai-browsers",     name: "AI Browsers",        count: 12, recent: ["Arc — Spaces vs tabs", "Dia demo — typing intent"],  hot: true },
  { id: "ai-agents",       name: "Autonomous Agents",  count: 8,  recent: ["MCP — tool-using agents"] },
  { id: "guitar-samples",  name: "Guitar Samples",     count: 14, recent: ["GTR_clean_96bpm_E", "GTR_dirty_96bpm_Bb"] },
  { id: "drum-loops",      name: "Drum Loops",         count: 9,  recent: ["DRM_breakbeat_94bpm_dry"] },
  { id: "design-systems",  name: "Design Systems",     count: 11, recent: ["Mymind — capture pile"] },
  { id: "typography",      name: "Typography",         count: 6,  recent: ["Diatype specimen", "Bento — composition"] },
  { id: "product-specs",   name: "Product Specs",      count: 7,  recent: ["Roadmap Q3", "Personas"] },
  { id: "second-brain",    name: "Second Brain",       count: 10, recent: ["Pieces OS", "Recall critique"] },
  { id: "github",          name: "GitHub",             count: 5,  recent: ["PR #482 — embeddings"] },
];

export const SEED_SPACES = [
  {
    id: "research", name: "Research", color: "#F0FF31",
    pinned: [
      { fav: "P", title: "Perplexity",           url: "perplexity.ai" },
      { fav: "S", title: "Semantic Scholar",     url: "semanticscholar.org" },
      { fav: "A", title: "Are.na — mono refs",   url: "are.na/serenity/mono-refs" },
      { fav: "G", title: "Google Scholar",       url: "scholar.google.com" },
    ],
    groups: [
      { name: "AI Browsers", color: "var(--accent)", tabs: [
        { fav: "T", title: "The Browser Company — Arc was always for me", url: "thebrowser.company" },
        { fav: "D", title: "Dia by The Browser Company",                  url: "diabrowser.com" },
        { fav: "C", title: "Comet — agent-native browser",                url: "comet.app" },
      ]},
      { name: "Agents", color: "#7A5AF8", tabs: [
        { fav: "M", title: "MCP specification",                           url: "modelcontextprotocol.io" },
        { fav: "F", title: "FAZM computer-use agent",                     url: "fazm.ai/agent" },
        { fav: "B", title: "browseragents.dev benchmark",                 url: "browseragents.dev" },
      ]},
      { name: "Second Brain", color: "#00E0FF", tabs: [
        { fav: "P", title: "Pieces — long-term memory",                   url: "pieces.app" },
        { fav: "M", title: "MyMind — what saving should feel like",       url: "mymind.com" },
        { fav: "O", title: "Obsidian — local-first knowledge",            url: "obsidian.md" },
      ]},
    ],
    archived: [
      { fav: "R", title: "Raindrop.io — bookmark manager", url: "raindrop.io", archivedAt: "2d" },
      { fav: "N", title: "Notion AI — capture demo",       url: "notion.so",   archivedAt: "5d" },
    ],
  },
  {
    id: "work", name: "Work", color: "#0A0A0A",
    pinned: [
      { fav: "L", title: "Linear",  url: "linear.app/sterling" },
      { fav: "G", title: "GitHub",  url: "github.com/sterling-search" },
      { fav: "N", title: "Notion",  url: "notion.so/sterling" },
      { fav: "S", title: "Slack",   url: "sterling.slack.com" },
    ],
    groups: [
      { name: "PRs in review", color: "var(--ok)", tabs: [
        { fav: "#", title: "#482 wire vector embeddings into capture",    url: "github.com/sterling-search/app/pull/482" },
        { fav: "#", title: "#481 collapse memory & saved into one schema",url: "github.com/sterling-search/app/pull/481" },
        { fav: "#", title: "#479 brutalist mono pass on Library",         url: "github.com/sterling-search/app/pull/479" },
      ]},
      { name: "Specs", color: "#F0FF31", tabs: [
        { fav: "N", title: "Notion — Q3 roadmap",          url: "notion.so/sterling/q3" },
        { fav: "N", title: "Notion — Sterling memory v2 RFC", url: "notion.so/sterling/memory-v2" },
      ]},
    ],
    archived: [],
  },
  {
    id: "music", name: "Music", color: "#FF6A1F",
    pinned: [
      { fav: "S", title: "Splice",    url: "splice.com" },
      { fav: "L", title: "Loopcloud", url: "loopcloud.com" },
      { fav: "B", title: "Bandcamp",  url: "bandcamp.com" },
    ],
    groups: [
      { name: "Tonight's session", color: "var(--accent)", tabs: [
        { fav: "S", title: "Splice — 96 BPM E minor guitar loops", url: "splice.com/sounds/search?bpm=96" },
        { fav: "Y", title: "Youtube — Boom bap drum tutorial",      url: "youtube.com" },
      ]},
    ],
    archived: [],
  },
  {
    id: "life", name: "Life", color: "#1B6E3A",
    pinned: [
      { fav: "G", title: "Gmail",    url: "mail.google.com" },
      { fav: "C", title: "Calendar", url: "calendar.google.com" },
    ],
    groups: [
      { name: "Tokyo — May", color: "var(--accent)", tabs: [
        { fav: "T", title: "Tabelog — Daikanyama", url: "tabelog.com" },
        { fav: "A", title: "Airbnb — Shimokita",   url: "airbnb.com" },
      ]},
    ],
    archived: [],
  },
];

export const SEED_MEMORIES = [
  { when: "Today · 09:14", txt: "Decided to keep capture inbox separate from auto-filed library — the user wants to see what just came in before it disappears into folders.", src: "from note · 'Personas'" },
  { when: "Today · 08:42", txt: "Working on Sterling Search memory v2 — primary question is whether to embed everything or only what the user opens twice.", src: "you added" },
  { when: "Yesterday",     txt: "Prefers mono-only typography for product UI; reserves serif for AI-generated long-form (assistant answers, summaries).", src: "auto · pattern" },
  { when: "Yesterday",     txt: "Researching AI browsers; Arc/Dia/Comet are the three benchmarks. Has skeptical priors about agents acting without confirmation.", src: "auto · 14 saves" },
  { when: "2 days ago",    txt: "Guitar sessions cluster around 90–100 BPM. E minor and Bb most-saved keys.", src: "auto · 23 saves" },
  { when: "3 days ago",    txt: "Don't summarize meeting notes automatically — wants to read the raw transcript first and tag it themselves.", src: "you said" },
  { when: "1 week ago",    txt: "Email and calendar should be readable but not indexed for AI memory — privacy preference.", src: "settings" },
];

export const SEED_TASKS = [
  { id: "t01", title: "Find and dedupe my saved AI browser articles",  step: "step 6 / 7", progress: 86, status: "running", state: "running" },
  { id: "t02", title: "Compile a one-page report on MCP servers",       step: "step 3 / 5", progress: 60, status: "running", state: "running" },
  { id: "t03", title: "Pull every Stripe Press long-read into Library", step: "done",       progress: 100, status: "done",   state: "done" },
  { id: "t04", title: "Tidy the 23 tabs in Work · cleanup yesterday",   step: "done",       progress: 100, status: "done",   state: "done" },
  { id: "t05", title: "Watch are.na for new mono brutalist boards",     step: "queued",     progress: 0,   status: "queued", state: "queued" },
  { id: "t06", title: "Summarize this week's GitHub PR activity",       step: "queued",     progress: 0,   status: "queued", state: "queued" },
];

export const SEED_BRIEF = {
  greeting: "Thursday · May 15",
  priorities: [
    "Ship Sterling memory v2 RFC before standup.",
    "Listen to the 4 unreviewed guitar loops in Inbox.",
    "Reply to D. about the PM interview notes.",
  ],
  calendar: [
    { t: "10:00", title: "Sterling standup",          dur: "20m" },
    { t: "11:30", title: "1:1 with E. — search v2",   dur: "45m" },
    { t: "14:00", title: "PM interview · D. (Stripe)", dur: "45m" },
    { t: "16:00", title: "Studio time — 90 BPM session", dur: "2h" },
  ],
  inbox: [
    { who: "Notion",        txt: "E. left 4 comments on memory v2 RFC" },
    { who: "GitHub",        txt: "PR #482 ready for re-review" },
    { who: "Slack · #design", txt: "Karri shared a brutalist mood board" },
  ],
  counts: { saved: 1284, this_week: 47, this_month: 184, memory: 392 },
};
