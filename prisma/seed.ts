import { PrismaClient, ItemType, TaskStatus, IntegrationProvider } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Sterling Search database...");

  // ─────────────────────────────────────────
  // USER
  // ─────────────────────────────────────────
  const passwordHash = await bcrypt.hash("sterling123", 12);

  const user = await prisma.user.upsert({
    where: { email: "will@sterling.app" },
    update: {},
    create: {
      email: "will@sterling.app",
      name: "Will Sterling",
      passwordHash,
      memoryEnabled: true,
    },
  });

  console.log(`✓ User created: ${user.email}`);

  // ─────────────────────────────────────────
  // TOPICS
  // ─────────────────────────────────────────
  const topicsData = [
    // AI cluster
    { name: "ai-browsers",     parent: "AI",        count: 38, subs: ["automation", "extension-apis", "chromium", "web-agents"] },
    { name: "ai-agents",       parent: "AI",        count: 24, subs: ["autonomous", "multi-agent", "tool-use", "planning"] },
    { name: "ai-productivity", parent: "AI",        count: 17, subs: ["copilots", "writing", "summarization", "scheduling"] },
    // Knowledge cluster
    { name: "second-brain",    parent: "Knowledge", count: 29, subs: ["pkm", "zettelkasten", "obsidian", "roam", "spaced-repetition"] },
    // Design cluster
    { name: "design-systems",  parent: "Design",    count: 22, subs: ["tokens", "components", "documentation", "figma"] },
    { name: "typography",      parent: "Design",    count: 14, subs: ["type-scales", "variable-fonts", "readability", "display"] },
    // Music cluster
    { name: "guitar-samples",  parent: "Music",     count: 41, subs: ["acoustic", "electric", "fingerpicking", "loops", "stems"] },
    { name: "drum-loops",      parent: "Music",     count: 33, subs: ["trap", "boom-bap", "jazz", "electronic", "fills"] },
    // Work cluster
    { name: "product-specs",   parent: "Work",      count: 19, subs: ["prd", "requirements", "roadmap", "user-stories"] },
    { name: "github",          parent: "Work",      count: 27, subs: ["repos", "prs", "issues", "actions", "gists"] },
    { name: "meeting-notes",   parent: "Work",      count: 12, subs: ["standups", "design-reviews", "1on1s", "offsites"] },
    // Reading cluster
    { name: "longreads",       parent: "Reading",   count: 31, subs: ["essays", "journalism", "analysis", "profiles"] },
    // Research cluster
    { name: "interviews",      parent: "Research",  count: 8,  subs: ["founder", "designer", "engineer", "product"] },
    // Life cluster
    { name: "city-eats",       parent: "Life",      count: 11, subs: ["sf", "nyc", "tokyo", "london", "natural-wine"] },
  ];

  for (const t of topicsData) {
    await prisma.topic.upsert({
      where: { userId_name: { userId: user.id, name: t.name } },
      update: { count: t.count, subs: t.subs, parent: t.parent },
      create: { userId: user.id, name: t.name, parent: t.parent, count: t.count, subs: t.subs },
    });
  }

  console.log(`✓ ${topicsData.length} topics seeded`);

  // ─────────────────────────────────────────
  // TAGS
  // ─────────────────────────────────────────
  const tagsData = [
    { name: "ai", count: 42 },
    { name: "browser", count: 18 },
    { name: "research", count: 31 },
    { name: "design", count: 25 },
    { name: "music", count: 37 },
    { name: "work", count: 22 },
    { name: "reading", count: 29 },
    { name: "tool", count: 15 },
    { name: "paper", count: 11 },
    { name: "video", count: 9 },
    { name: "audio", count: 14 },
    { name: "starred", count: 8 },
    { name: "pkm", count: 12 },
    { name: "typography", count: 7 },
    { name: "productivity", count: 19 },
  ];

  for (const t of tagsData) {
    await prisma.tag.upsert({
      where: { userId_name: { userId: user.id, name: t.name } },
      update: { count: t.count },
      create: { userId: user.id, name: t.name, count: t.count },
    });
  }

  console.log(`✓ ${tagsData.length} tags seeded`);

  // ─────────────────────────────────────────
  // SAVED ITEMS (24 items)
  // ─────────────────────────────────────────
  const now = new Date();
  const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000);
  const hoursAgo = (n: number) => new Date(now.getTime() - n * 3600000);

  const savedItemsData = [
    // 1. AI browser paper
    {
      title: "WebAgent: A Scalable Brain-Computer Interface for Web Automation",
      description: "A novel architecture enabling LLMs to control browsers through structured DOM representations and action primitives. Achieves 89.4% success rate on WebArena benchmark.",
      type: ItemType.LINK,
      source: "arxiv.org",
      url: "https://arxiv.org/abs/2401.12345",
      contentText: "We present WebAgent, a scalable architecture for LLM-driven browser automation. Our approach decomposes web tasks into atomic action primitives (click, type, scroll, navigate) and introduces a structured DOM representation that dramatically reduces token consumption while preserving semantic fidelity...",
      topics: ["ai-browsers", "ai-agents"],
      tags: ["ai", "browser", "research", "paper"],
      suggestedFolder: "AI Research",
      isStarred: true,
      savedAt: hoursAgo(2),
    },
    // 2. Guitar sample pack
    {
      title: "Intimate Acoustics Vol. 3 — 24-bit Fingerpicking Sessions",
      description: "Hand-recorded acoustic guitar samples at 24bit/96kHz, featuring open tunings and percussive techniques. 847 samples across 12 chord families.",
      type: ItemType.AUDIO,
      mimeType: "audio/zip",
      source: "splice.com",
      url: "https://splice.com/sounds/packs/intimate-acoustics-vol3",
      fileKey: "samples/intimate-acoustics-vol3.zip",
      fileSize: 2_840_000_000,
      topics: ["guitar-samples"],
      tags: ["audio", "music", "acoustic"],
      suggestedFolder: "Music / Samples",
      isStarred: false,
      savedAt: hoursAgo(5),
    },
    // 3. Design system article
    {
      title: "Tokens, Tiers, and Trust: How Stripe Rebuilt Their Design System",
      description: "An inside look at Stripe's 18-month design system overhaul — moving from ad-hoc components to a rigorous token-first architecture with multi-brand support.",
      type: ItemType.LINK,
      source: "stripe.com",
      url: "https://stripe.com/blog/design-system-2024",
      contentText: "When we set out to rebuild Stripe's design system in late 2022, we had a single north star: every product surface should feel like it came from one team. What followed was an 18-month journey through tokens, tooling, and an unexpected amount of philosophy...",
      topics: ["design-systems"],
      tags: ["design", "tool", "research"],
      suggestedFolder: "Design",
      isStarred: true,
      savedAt: hoursAgo(8),
    },
    // 4. Meeting notes (note type)
    {
      title: "Product Sync — Q1 Roadmap Review",
      description: "Notes from Thursday's full product team sync. Covered browser feature prioritization, agent task queue UX, and search quality metrics.",
      type: ItemType.NOTE,
      contentText: `# Product Sync — Q1 Roadmap Review\n\n**Date:** ${daysAgo(1).toLocaleDateString()}\n**Attendees:** Will, Sarah, Marcus, Dev team\n\n## Key Decisions\n- Browser spaces ship before whiteboard feature\n- Agent task queue needs progress streaming via SSE\n- Search: implement hybrid BM25 + vector by end of sprint\n\n## Action Items\n- [ ] Will: finalize agent task spec\n- [ ] Sarah: design token audit\n- [ ] Marcus: SSE proof of concept\n\n## Notes\nThe team aligned on brutalist design direction. Color palette vote: lime wins 4-2 over cyan.`,
      topics: ["meeting-notes", "product-specs"],
      tags: ["work"],
      suggestedFolder: "Work / Meetings",
      isStarred: false,
      savedAt: daysAgo(1),
    },
    // 5. Drum loops
    {
      title: "Lo-Fi Boom Bap Drums — SP404 Session Recordings",
      description: "Raw SP404 drum recordings with tape saturation and vinyl noise. 180 loops at 75–95 BPM, including brushed snare and sidestick variations.",
      type: ItemType.AUDIO,
      mimeType: "audio/zip",
      source: "looperman.com",
      url: "https://looperman.com/loops/sp404-boom-bap-bundle",
      fileKey: "samples/sp404-boom-bap.zip",
      fileSize: 1_240_000_000,
      topics: ["drum-loops"],
      tags: ["audio", "music", "boom-bap"],
      suggestedFolder: "Music / Samples",
      isStarred: true,
      savedAt: daysAgo(2),
    },
    // 6. GitHub repo
    {
      title: "browser-use/browser-use — Make websites accessible to AI agents",
      description: "Open-source Python library enabling AI agents to control browsers. 14.2k stars. Built on Playwright with a clean action API.",
      type: ItemType.LINK,
      source: "github.com",
      url: "https://github.com/browser-use/browser-use",
      topics: ["ai-browsers", "github", "ai-agents"],
      tags: ["ai", "browser", "tool"],
      suggestedFolder: "AI / Tools",
      isStarred: true,
      savedAt: daysAgo(2),
    },
    // 7. PDF research paper
    {
      title: "Building a Second Brain: A Proven Method to Organize Your Digital Life",
      description: "Tiago Forte's foundational essay on the CODE framework — Capture, Organize, Distill, Express — as applied to knowledge management systems.",
      type: ItemType.PDF,
      mimeType: "application/pdf",
      source: "fortelabs.com",
      url: "https://fortelabs.com/blog/basboverview",
      fileKey: "pdfs/basb-overview-forte.pdf",
      fileSize: 4_200_000,
      contentText: "The premise of Building a Second Brain is simple: our minds are for having ideas, not holding them. As the volume and complexity of information we consume grows exponentially, we need external systems to capture, organize, and retrieve that knowledge...",
      topics: ["second-brain"],
      tags: ["pkm", "reading", "research"],
      suggestedFolder: "Knowledge / PKM",
      isStarred: false,
      savedAt: daysAgo(3),
    },
    // 8. Screenshot
    {
      title: "Linear — Sprint Board Screenshot (Feb 14)",
      description: "Screenshot of the Linear sprint board showing 23 open issues across Browser, Search, and Agent workstreams.",
      type: ItemType.SCREENSHOT,
      mimeType: "image/png",
      source: "linear.app",
      url: "https://linear.app/sterling",
      fileKey: "screenshots/linear-sprint-feb14.png",
      fileSize: 890_000,
      topics: ["product-specs", "github"],
      tags: ["work"],
      suggestedFolder: "Work / Tracking",
      isStarred: false,
      savedAt: daysAgo(3),
    },
    // 9. Long read essay
    {
      title: "The Tyranny of the Explicit: Why We Keep Building Tools That Get in Our Way",
      description: "A 6,000-word essay on implicit vs explicit interfaces, learned affordances, and why most productivity software fails at the moment of retrieval.",
      type: ItemType.LINK,
      source: "substack.com",
      url: "https://fakeforum.substack.com/p/tyranny-of-the-explicit",
      contentText: "Every tool I've loved has had one thing in common: it knew things about me that I never told it. Not in a surveillance sense — in the sense that a good collaborator develops a model of your working style, your obsessions, your patterns of thought...",
      topics: ["longreads", "second-brain", "ai-productivity"],
      tags: ["reading", "research", "pkm"],
      suggestedFolder: "Reading / Essays",
      isStarred: true,
      savedAt: daysAgo(4),
    },
    // 10. Video
    {
      title: "Jony Ive on Restraint, Materials, and the Death of Decoration",
      description: "Rare 2023 interview at Stripe Sessions where Ive discusses the philosophy behind Apple's industrial design discipline and his current work at LoveFrom.",
      type: ItemType.VIDEO,
      mimeType: "video/youtube",
      source: "youtube.com",
      url: "https://www.youtube.com/watch?v=jonyive-stripe-sessions",
      topics: ["interviews", "design-systems"],
      tags: ["video", "design", "research"],
      suggestedFolder: "Design / Interviews",
      isStarred: true,
      savedAt: daysAgo(4),
    },
    // 11. Typography article
    {
      title: "Variable Fonts in Practice: A Type Designer's Field Notes",
      description: "Practical guide to implementing variable fonts in production — covering axis taxonomy, instance caching, and the surprising performance wins.",
      type: ItemType.LINK,
      source: "fonts.google.com",
      url: "https://fonts.google.com/knowledge/using_type/variable_fonts",
      contentText: "Variable fonts represent the most significant technical advancement in type since PostScript. But their power comes with complexity. In this guide I'll walk through the practical realities of shipping variable fonts: from choosing axes to debugging render inconsistencies across OS...",
      topics: ["typography", "design-systems"],
      tags: ["design", "typography", "tool"],
      suggestedFolder: "Design / Typography",
      isStarred: false,
      savedAt: daysAgo(5),
    },
    // 12. Agent paper
    {
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      description: "Google DeepMind paper introducing the ReAct prompting paradigm — interleaving chain-of-thought reasoning with executable actions in a unified agent loop.",
      type: ItemType.PDF,
      mimeType: "application/pdf",
      source: "arxiv.org",
      url: "https://arxiv.org/pdf/2210.03629",
      fileKey: "pdfs/react-reasoning-acting-2022.pdf",
      fileSize: 2_100_000,
      contentText: "We explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner, allowing for greater synergy between the two: reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external sources...",
      topics: ["ai-agents"],
      tags: ["ai", "research", "paper"],
      suggestedFolder: "AI Research",
      isStarred: true,
      savedAt: daysAgo(5),
    },
    // 13. Notion doc link
    {
      title: "Sterling Search — Product Requirements Document v0.4",
      description: "Full PRD for Sterling Search covering browser, search, assistant, whiteboard, and agent modules. Last updated by Will.",
      type: ItemType.LINK,
      source: "notion.so",
      url: "https://notion.so/sterling/product-requirements-v04",
      topics: ["product-specs"],
      tags: ["work", "research"],
      suggestedFolder: "Work / Specs",
      isStarred: true,
      savedAt: daysAgo(6),
    },
    // 14. Electric guitar samples
    {
      title: "Fender Rhodes & Electric Keys — Multisampled Studio Sessions",
      description: "60-piece multisampled Rhodes and Wurlitzer from vintage hardware, recorded at Fantasy Studios in Berkeley. Includes round-robin and velocity layers.",
      type: ItemType.AUDIO,
      mimeType: "audio/zip",
      source: "native-instruments.com",
      url: "https://native-instruments.com/samples/rhodes-multisampled",
      fileKey: "samples/rhodes-electric-keys.zip",
      fileSize: 3_600_000_000,
      topics: ["guitar-samples"],
      tags: ["audio", "music"],
      suggestedFolder: "Music / Samples",
      isStarred: false,
      savedAt: daysAgo(6),
    },
    // 15. City eats
    {
      title: "A Perfect Day of Eating in Noe Valley, SF",
      description: "Detailed food guide: morning at Philz, lunch at Contigo, afternoon espresso at Noe Valley Bakery, dinner at Firefly. With reservations notes.",
      type: ItemType.LINK,
      source: "eater.com",
      url: "https://sf.eater.com/maps/best-restaurants-noe-valley-san-francisco",
      topics: ["city-eats"],
      tags: ["reading", "life"],
      suggestedFolder: "Life / Food",
      isStarred: false,
      savedAt: daysAgo(7),
    },
    // 16. AI productivity tool
    {
      title: "Granola — AI Notepad for Meetings",
      description: "Mac app that records your meeting audio, transcribes in real time, and auto-generates structured notes with action items. Integrates with Google Calendar.",
      type: ItemType.LINK,
      source: "granola.so",
      url: "https://granola.so",
      topics: ["ai-productivity", "meeting-notes"],
      tags: ["ai", "tool", "productivity"],
      suggestedFolder: "AI / Tools",
      isStarred: true,
      savedAt: daysAgo(7),
    },
    // 17. Research interview
    {
      title: "Figma's Dylan Field on Multiplayer, Config, and the Next Ten Years",
      description: "Long-form interview with Dylan Field exploring Figma's origin story, the Adobe deal collapse, and his conviction around AI-native design tooling.",
      type: ItemType.LINK,
      source: "theverge.com",
      url: "https://theverge.com/interviews/dylan-field-figma-2024",
      contentText: "Dylan Field was twenty-two when he started Figma. Twelve years later, after surviving a $20B acquisition collapse and watching competitors copy his core feature, he's thinking about what it means to build design tools for a generation that may never have learned Photoshop...",
      topics: ["interviews", "design-systems"],
      tags: ["research", "design", "reading"],
      suggestedFolder: "Research / Interviews",
      isStarred: false,
      savedAt: daysAgo(8),
    },
    // 18. PKM note
    {
      title: "My Personal Knowledge Architecture — 2024 Edition",
      description: "Self-written note documenting my current PKM setup: inboxes, processing cadence, topic taxonomy, and integration with Sterling Search.",
      type: ItemType.NOTE,
      contentText: `# My PKM Architecture — 2024\n\n## Capture Sources\n- Sterling browser extension (automatic)\n- Voice memos → Whisper transcription\n- Email newsletter digest (weekly)\n- Kindle highlights (auto-sync)\n\n## Processing Cadence\n- Daily: process inbox, tag new items\n- Weekly: review and connect topics\n- Monthly: generate reports, prune dead branches\n\n## Topic Taxonomy\nTop-level: AI, Design, Music, Work, Reading, Research, Life\nEach has 3-6 subtopics max.\n\n## The Rule\nIf something hasn't been referenced in 90 days and isn't starred, archive it.`,
      topics: ["second-brain"],
      tags: ["pkm", "work", "productivity"],
      suggestedFolder: "Knowledge / PKM",
      isStarred: true,
      savedAt: daysAgo(9),
    },
    // 19. Screenshot of design
    {
      title: "Vercel Dashboard — Dark Mode Redesign Preview",
      description: "Screenshot from Vercel's design preview blog post showing the new dark mode component library.",
      type: ItemType.SCREENSHOT,
      mimeType: "image/png",
      source: "vercel.com",
      url: "https://vercel.com/blog/design-system-dark-mode",
      fileKey: "screenshots/vercel-dark-mode-preview.png",
      fileSize: 1_240_000,
      topics: ["design-systems"],
      tags: ["design"],
      suggestedFolder: "Design / Inspiration",
      isStarred: false,
      savedAt: daysAgo(10),
    },
    // 20. Trap drum loops
    {
      title: "808 Drum Kit — Metro Boomin Producer Pack",
      description: "808s, claps, hi-hats and open hats tuned to chromatic scale. 240 one-shots at 24bit. Includes pitch-shifted 808 variants from C0 to C3.",
      type: ItemType.AUDIO,
      mimeType: "audio/zip",
      source: "producergrind.com",
      url: "https://producergrind.com/kits/808-drum-kit-metro",
      fileKey: "samples/808-metro-kit.zip",
      fileSize: 890_000_000,
      topics: ["drum-loops"],
      tags: ["audio", "music"],
      suggestedFolder: "Music / Samples",
      isStarred: false,
      savedAt: daysAgo(11),
    },
    // 21. Long read on AI
    {
      title: "The Model Is the Interface",
      description: "Essay arguing that as models become capable enough, the notion of a separate 'interface layer' collapses — the model becomes the product, not a feature inside it.",
      type: ItemType.LINK,
      source: "every.to",
      url: "https://every.to/chain-of-thought/the-model-is-the-interface",
      contentText: "For twenty years we've debated whether AI would replace programmers, writers, designers. We asked the wrong question. The transformation isn't that AI replaces roles — it's that the model itself becomes the product. The interface layer isn't wrapping AI anymore. It is AI...",
      topics: ["ai-agents", "ai-productivity", "longreads"],
      tags: ["ai", "reading", "research"],
      suggestedFolder: "Reading / Essays",
      isStarred: true,
      savedAt: daysAgo(12),
    },
    // 22. GitHub actions workflow
    {
      title: "turborepo/examples — Next.js + Prisma + Vercel monorepo template",
      description: "Official Turborepo starter with Next.js 14, Prisma, Vercel Postgres, and GitHub Actions CI. Includes preview deployments and migration workflow.",
      type: ItemType.LINK,
      source: "github.com",
      url: "https://github.com/vercel/turborepo/tree/main/examples/with-prisma",
      topics: ["github", "product-specs"],
      tags: ["tool", "work"],
      suggestedFolder: "Work / DevOps",
      isStarred: false,
      savedAt: daysAgo(13),
    },
    // 23. PDF on typography
    {
      title: "The Elements of Typographic Style — Bringhurst (Excerpts)",
      description: "Scanned excerpts from chapters 4–6 covering grid systems, optical sizing, and the relationship between type and white space.",
      type: ItemType.PDF,
      mimeType: "application/pdf",
      source: "fonts.google.com",
      url: "https://typographia.org/bringhurst-elements-excerpts.pdf",
      fileKey: "pdfs/bringhurst-excerpts-ch4-6.pdf",
      fileSize: 8_400_000,
      contentText: "The original task of typography — and it remains the task today — is to express the text, to make it legible, to clarify it typographically. In the course of this task the typographer is guided by the text itself, the nature of the reader and reading, and the nature of printing...",
      topics: ["typography"],
      tags: ["design", "typography", "reading"],
      suggestedFolder: "Design / Typography",
      isStarred: true,
      savedAt: daysAgo(14),
    },
    // 24. City eats video
    {
      title: "Tokyo Ramen Deep Dive — 5 Shops in Shinjuku",
      description: "45-minute documentary following a ramen obsessive through Shinjuku's hidden alleys. Covers tonkotsu, tori paitan, and tsukemen.",
      type: ItemType.VIDEO,
      mimeType: "video/youtube",
      source: "youtube.com",
      url: "https://www.youtube.com/watch?v=tokyo-ramen-shinjuku",
      topics: ["city-eats", "longreads"],
      tags: ["video", "reading"],
      suggestedFolder: "Life / Food",
      isStarred: false,
      savedAt: daysAgo(15),
    },
  ];

  await prisma.savedItem.deleteMany({ where: { userId: user.id } });
  for (const item of savedItemsData) {
    await prisma.savedItem.create({
      data: {
        userId: user.id,
        title: item.title,
        description: item.description ?? null,
        type: item.type,
        mimeType: item.mimeType ?? null,
        source: item.source ?? null,
        url: item.url ?? null,
        contentText: item.contentText ?? null,
        fileKey: item.fileKey ?? null,
        fileSize: item.fileSize ?? null,
        topics: item.topics ?? [],
        tags: item.tags ?? [],
        suggestedFolder: item.suggestedFolder ?? null,
        isStarred: item.isStarred ?? false,
        savedAt: item.savedAt,
      },
    });
  }

  console.log(`✓ ${savedItemsData.length} saved items seeded`);

  // ─────────────────────────────────────────
  // FOLDERS
  // ─────────────────────────────────────────
  const foldersToCreate = [
    { name: "AI Research",         icon: "🧠", color: "#F0FF31", itemCount: 12 },
    { name: "AI / Tools",          icon: "🔧", color: "#F0FF31", itemCount: 8  },
    { name: "Design",              icon: "✏️", color: "#00E0FF", itemCount: 15 },
    { name: "Design / Typography", icon: "T",  color: "#00E0FF", itemCount: 6  },
    { name: "Design / Inspiration",icon: "★",  color: "#00E0FF", itemCount: 9  },
    { name: "Design / Interviews", icon: "🎙", color: "#00E0FF", itemCount: 4  },
    { name: "Music / Samples",     icon: "🎵", color: "#7A5AF8", itemCount: 14 },
    { name: "Work / Meetings",     icon: "📅", color: "#FF6A1F", itemCount: 7  },
    { name: "Work / Specs",        icon: "📋", color: "#FF6A1F", itemCount: 5  },
    { name: "Work / Tracking",     icon: "📊", color: "#FF6A1F", itemCount: 3  },
    { name: "Work / DevOps",       icon: "⚙️", color: "#FF6A1F", itemCount: 6  },
    { name: "Knowledge / PKM",     icon: "🧩", color: "#1B6E3A", itemCount: 10 },
    { name: "Reading / Essays",    icon: "📖", color: "#4A4A48", itemCount: 18 },
    { name: "Research / Interviews",icon: "🔍",color: "#4A4A48", itemCount: 5  },
    { name: "Life / Food",         icon: "🍜", color: "#FF3B1F", itemCount: 8  },
  ];

  await prisma.folder.deleteMany({ where: { userId: user.id } });
  for (const f of foldersToCreate) {
    await prisma.folder.create({
      data: { userId: user.id, name: f.name, icon: f.icon, color: f.color, itemCount: f.itemCount },
    });
  }

  console.log(`✓ ${foldersToCreate.length} folders seeded`);

  // ─────────────────────────────────────────
  // BROWSER SPACES
  // ─────────────────────────────────────────
  await prisma.browserSpace.deleteMany({ where: { userId: user.id } });

  const workSpace = await prisma.browserSpace.create({
    data: {
      userId: user.id,
      name: "Work",
      color: "#FF6A1F",
      tabs: [
        { id: "t1", title: "Sterling Search — Dashboard", url: "http://localhost:3000", favicon: null, isPinned: true, groupId: null },
        { id: "t2", title: "Linear — Sprint Board", url: "https://linear.app/sterling", favicon: "https://linear.app/favicon.ico", isPinned: true, groupId: null },
        { id: "t3", title: "Vercel — Deployments", url: "https://vercel.com/sterling", favicon: "https://vercel.com/favicon.ico", isPinned: false, groupId: "g1" },
        { id: "t4", title: "GitHub — sterling-search", url: "https://github.com/wsterling/sterling-search", favicon: "https://github.com/favicon.ico", isPinned: false, groupId: "g1" },
        { id: "t5", title: "Prisma Studio", url: "http://localhost:5555", favicon: null, isPinned: false, groupId: null },
      ],
      pinnedTabs: ["t1", "t2"],
      tabGroups: [
        { id: "g1", name: "DevOps", color: "#FF6A1F" },
      ],
    },
  });

  const researchSpace = await prisma.browserSpace.create({
    data: {
      userId: user.id,
      name: "Research",
      color: "#F0FF31",
      tabs: [
        { id: "t1", title: "arxiv — cs.AI recent", url: "https://arxiv.org/list/cs.AI/recent", favicon: null, isPinned: true, groupId: null },
        { id: "t2", title: "WebAgent Paper", url: "https://arxiv.org/abs/2401.12345", favicon: null, isPinned: false, groupId: "g1" },
        { id: "t3", title: "ReAct Paper", url: "https://arxiv.org/abs/2210.03629", favicon: null, isPinned: false, groupId: "g1" },
        { id: "t4", title: "browser-use/browser-use", url: "https://github.com/browser-use/browser-use", favicon: "https://github.com/favicon.ico", isPinned: false, groupId: "g2" },
        { id: "t5", title: "Playwright Docs", url: "https://playwright.dev/docs/intro", favicon: "https://playwright.dev/favicon.ico", isPinned: false, groupId: "g2" },
        { id: "t6", title: "The Model Is the Interface — Every", url: "https://every.to/chain-of-thought/the-model-is-the-interface", favicon: null, isPinned: false, groupId: null },
      ],
      pinnedTabs: ["t1"],
      tabGroups: [
        { id: "g1", name: "Papers", color: "#F0FF31" },
        { id: "g2", name: "Tools", color: "#00E0FF" },
      ],
    },
  });

  const musicSpace = await prisma.browserSpace.create({
    data: {
      userId: user.id,
      name: "Music",
      color: "#7A5AF8",
      tabs: [
        { id: "t1", title: "Splice — My Samples", url: "https://splice.com/sounds/your-pack", favicon: "https://splice.com/favicon.ico", isPinned: true, groupId: null },
        { id: "t2", title: "Native Instruments — Rhodes Kit", url: "https://native-instruments.com/samples/rhodes-multisampled", favicon: null, isPinned: false, groupId: null },
        { id: "t3", title: "Looperman — Boom Bap", url: "https://looperman.com/loops/sp404-boom-bap-bundle", favicon: null, isPinned: false, groupId: null },
        { id: "t4", title: "Ableton — MIDI Tricks", url: "https://www.ableton.com/en/blog/midi-tricks/", favicon: null, isPinned: false, groupId: null },
      ],
      pinnedTabs: ["t1"],
      tabGroups: [],
    },
  });

  console.log(`✓ 3 browser spaces seeded (Work, Research, Music)`);

  // Add browser tabs
  const spaceTabs = [
    { spaceId: workSpace.id,     title: "Sterling Search — Dashboard",  url: "http://localhost:3000",                                  isPinned: true  },
    { spaceId: workSpace.id,     title: "Linear — Sprint Board",        url: "https://linear.app/sterling",                           isPinned: true  },
    { spaceId: workSpace.id,     title: "Vercel — Deployments",         url: "https://vercel.com/sterling",                           isPinned: false },
    { spaceId: workSpace.id,     title: "GitHub — sterling-search",     url: "https://github.com/wsterling/sterling-search",           isPinned: false },
    { spaceId: researchSpace.id, title: "arxiv — cs.AI recent",         url: "https://arxiv.org/list/cs.AI/recent",                   isPinned: true  },
    { spaceId: researchSpace.id, title: "browser-use/browser-use",      url: "https://github.com/browser-use/browser-use",            isPinned: false },
    { spaceId: researchSpace.id, title: "The Model Is the Interface",   url: "https://every.to/chain-of-thought/the-model-is-the-interface", isPinned: false },
    { spaceId: musicSpace.id,    title: "Splice — My Samples",          url: "https://splice.com/sounds/your-pack",                   isPinned: true  },
    { spaceId: musicSpace.id,    title: "Native Instruments — Rhodes",  url: "https://native-instruments.com/samples/rhodes-multisampled", isPinned: false },
  ];

  for (const tab of spaceTabs) {
    await prisma.browserTab.create({ data: tab });
  }

  // ─────────────────────────────────────────
  // TRAFFIC RULES
  // ─────────────────────────────────────────
  const trafficRules = [
    { pattern: "github.com/*",        spaceId: workSpace.id,     priority: 10 },
    { pattern: "linear.app/*",        spaceId: workSpace.id,     priority: 10 },
    { pattern: "vercel.com/*",        spaceId: workSpace.id,     priority: 10 },
    { pattern: "localhost:*",         spaceId: workSpace.id,     priority: 5  },
    { pattern: "arxiv.org/*",         spaceId: researchSpace.id, priority: 10 },
    { pattern: "*.substack.com/*",    spaceId: researchSpace.id, priority: 8  },
    { pattern: "every.to/*",          spaceId: researchSpace.id, priority: 8  },
    { pattern: "splice.com/*",        spaceId: musicSpace.id,    priority: 10 },
    { pattern: "looperman.com/*",     spaceId: musicSpace.id,    priority: 10 },
    { pattern: "native-instruments.com/*", spaceId: musicSpace.id, priority: 10 },
  ];

  await prisma.trafficRule.deleteMany({ where: { userId: user.id } });
  for (const rule of trafficRules) {
    await prisma.trafficRule.create({
      data: { userId: user.id, pattern: rule.pattern, spaceId: rule.spaceId, priority: rule.priority },
    });
  }

  console.log(`✓ ${trafficRules.length} traffic rules seeded`);

  // ─────────────────────────────────────────
  // MEMORY ENTRIES
  // ─────────────────────────────────────────
  const memoriesData = [
    {
      content: "Will prefers brutalist design with monospace fonts. The accent color votes were: lime 4, cyan 2.",
      source: "product-sync-q1",
      tags: ["design", "preferences"],
    },
    {
      content: "Current PKM system uses Sterling as primary capture, Obsidian for long-form notes, and weekly review sessions on Sundays.",
      source: "pkm-note",
      tags: ["pkm", "workflow"],
    },
    {
      content: "Active research threads: AI browser agents (high priority), second brain architecture, variable font performance.",
      source: "research-audit",
      tags: ["ai", "research", "design"],
    },
    {
      content: "Music production workflow: samples collected in Sterling, organized in Ableton projects under ~/Music/Projects. Prefers lo-fi and jazz-influenced beats.",
      source: "music-note",
      tags: ["music", "workflow"],
    },
    {
      content: "Dining preferences: natural wine bars, ramen, tacos. Favorite SF neighborhoods for food: Noe Valley, Mission, Inner Richmond.",
      source: "city-eats-archive",
      tags: ["food", "sf", "preferences"],
    },
    {
      content: "Agent task queue should use SSE for progress streaming. Confirmed in Q1 roadmap sync.",
      source: "product-sync-q1",
      tags: ["engineering", "work"],
    },
    {
      content: "Typography rule: body text at 13px/20px line-height in the design system. No rounding on body, 2px on interactive elements.",
      source: "design-tokens-doc",
      tags: ["design", "typography"],
    },
    {
      content: "ReAct pattern is the go-to for Sterling's agent architecture. Will has read the paper twice, considers it foundational.",
      source: "react-paper-notes",
      tags: ["ai", "research"],
    },
  ];

  await prisma.memoryEntry.deleteMany({ where: { userId: user.id } });
  for (const mem of memoriesData) {
    await prisma.memoryEntry.create({
      data: { userId: user.id, content: mem.content, source: mem.source, tags: mem.tags },
    });
  }

  console.log(`✓ ${memoriesData.length} memory entries seeded`);

  // ─────────────────────────────────────────
  // AGENT TASKS
  // ─────────────────────────────────────────
  await prisma.agentTask.deleteMany({ where: { userId: user.id } });

  const agentTasksData = [
    {
      title: "Generate report on AI browser agents landscape",
      status: TaskStatus.DONE,
      step: "Complete",
      progress: 100,
      result: "Report generated: 'AI Browser Agents in 2024' — 2,400 words covering WebAgent, browser-use, Playwright-AI, and emerging patterns. Cited 8 sources from your library.",
      log: [
        { ts: hoursAgo(3), message: "Task queued" },
        { ts: hoursAgo(3), message: "Scanning saved items for topic: ai-browsers" },
        { ts: hoursAgo(3), message: "Found 7 relevant sources" },
        { ts: hoursAgo(3), message: "Generating outline..." },
        { ts: hoursAgo(2), message: "Writing section 1: Browser Control Architectures" },
        { ts: hoursAgo(2), message: "Writing section 2: Benchmark Results" },
        { ts: hoursAgo(2), message: "Writing section 3: Open Problems" },
        { ts: hoursAgo(2), message: "Report complete. 2,413 words." },
      ],
    },
    {
      title: "Index new guitar sample packs",
      status: TaskStatus.DONE,
      step: "Complete",
      progress: 100,
      result: "Indexed 3 sample packs: Intimate Acoustics Vol. 3 (847 samples), SP404 Boom Bap (180 loops), 808 Metro Kit (240 one-shots). Added to topics: guitar-samples, drum-loops.",
      log: [
        { ts: daysAgo(2), message: "Task queued" },
        { ts: daysAgo(2), message: "Extracting metadata from 3 audio archives" },
        { ts: daysAgo(2), message: "Processing: intimate-acoustics-vol3.zip" },
        { ts: daysAgo(2), message: "Processing: sp404-boom-bap.zip" },
        { ts: daysAgo(2), message: "Processing: 808-metro-kit.zip" },
        { ts: daysAgo(2), message: "All samples indexed. Topics updated." },
      ],
    },
    {
      title: "Research: Variable fonts for design system",
      status: TaskStatus.RUNNING,
      step: "Searching web sources",
      progress: 45,
      result: null,
      log: [
        { ts: hoursAgo(1), message: "Task queued" },
        { ts: hoursAgo(1), message: "Scanning library for topic: typography" },
        { ts: hoursAgo(1), message: "Found 3 relevant saved items" },
        { ts: hoursAgo(0.5), message: "Searching web for 'variable fonts performance 2024'" },
        { ts: hoursAgo(0.2), message: "Fetching fonts.google.com/knowledge..." },
      ],
    },
    {
      title: "Summarize all longreads saved this month",
      status: TaskStatus.QUEUED,
      step: null,
      progress: 0,
      result: null,
      log: [],
    },
    {
      title: "Extract todos from all meeting notes",
      status: TaskStatus.FAILED,
      step: "Error parsing note format",
      progress: 30,
      result: null,
      log: [
        { ts: daysAgo(1), message: "Task queued" },
        { ts: daysAgo(1), message: "Found 2 meeting notes" },
        { ts: daysAgo(1), message: "Parsing: Product Sync Q1" },
        { ts: daysAgo(1), message: "ERROR: Note content encoding issue — retrying..." },
        { ts: daysAgo(1), message: "FAILED: Max retries exceeded" },
      ],
    },
  ];

  for (const task of agentTasksData) {
    await prisma.agentTask.create({
      data: {
        userId: user.id,
        title: task.title,
        status: task.status,
        step: task.step ?? null,
        progress: task.progress,
        result: task.result ?? null,
        log: task.log,
      },
    });
  }

  console.log(`✓ ${agentTasksData.length} agent tasks seeded`);

  // ─────────────────────────────────────────
  // ASSISTANT MESSAGES
  // ─────────────────────────────────────────
  await prisma.assistantMessage.deleteMany({ where: { userId: user.id } });

  const messagesData = [
    {
      role: "USER" as const,
      content: "What are the main patterns in the AI browser agent papers I've saved?",
      citations: null,
      createdAt: hoursAgo(4),
    },
    {
      role: "ASSISTANT" as const,
      content: "Based on the 3 papers in your library, I can identify two dominant architectural patterns:\n\n**1. Structured DOM Representation**\nBoth WebAgent and browser-use convert raw HTML into a normalized action tree, reducing token usage by ~70% while preserving interactive element semantics. The key insight is that agents don't need visual layout — just affordance graphs.\n\n**2. ReAct Loop with Typed Actions**\nAll papers converge on an interleaved reason-then-act loop with typed primitives (click, type, scroll, navigate). This mirrors tool-use patterns but with stricter schemas to prevent hallucinated actions.\n\n**Open problems** flagged across all three: handling dynamic content (SPAs, infinite scroll), multi-tab coordination, and verification of action success.",
      citations: [
        { id: "c1", title: "WebAgent: A Scalable Brain-Computer Interface", source: "arxiv.org", snippet: "structured DOM representation that dramatically reduces token consumption" },
        { id: "c2", title: "ReAct: Synergizing Reasoning and Acting", source: "arxiv.org", snippet: "interleaving chain-of-thought reasoning with executable actions" },
        { id: "c3", title: "browser-use/browser-use", source: "github.com", snippet: "clean action API built on Playwright" },
      ],
      createdAt: hoursAgo(4),
    },
    {
      role: "USER" as const,
      content: "Which of my saved items are most relevant to building an agent task queue?",
      citations: null,
      createdAt: hoursAgo(2),
    },
    {
      role: "ASSISTANT" as const,
      content: "For building an agent task queue, your most relevant saved items are:\n\n1. **ReAct paper** — defines the fundamental reasoning loop your task execution engine should implement\n2. **Product Requirements v0.4** — contains your own spec for the task queue, including SSE streaming requirement from Q1 sync\n3. **browser-use/browser-use** — reference implementation for how tasks translate to browser actions\n\nFrom your memory, I also know you decided on SSE for progress streaming in the Q1 roadmap sync. The task status enum (QUEUED → RUNNING → DONE/FAILED/CANCELLED) is already in your Prisma schema.",
      citations: [
        { id: "c1", title: "ReAct: Synergizing Reasoning and Acting", source: "arxiv.org", snippet: "interleaved reason-then-act loop with typed primitives" },
        { id: "c2", title: "Sterling Search — Product Requirements Document v0.4", source: "notion.so", snippet: "agent task queue needs progress streaming via SSE" },
      ],
      createdAt: hoursAgo(2),
    },
  ];

  for (const msg of messagesData) {
    await prisma.assistantMessage.create({
      data: {
        userId: user.id,
        role: msg.role,
        content: msg.content,
        citations: msg.citations ?? undefined,
        createdAt: msg.createdAt,
      },
    });
  }

  console.log(`✓ ${messagesData.length} assistant messages seeded`);

  // ─────────────────────────────────────────
  // DAILY BRIEF
  // ─────────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyBrief.upsert({
    where: { userId_date: { userId: user.id, date: today } },
    update: {},
    create: {
      userId: user.id,
      date: today,
      priorities: [
        { id: "p1", text: "Finalize agent task spec and hand off to Marcus", done: false },
        { id: "p2", text: "Review design token audit from Sarah", done: false },
        { id: "p3", text: "Merge browser spaces PR", done: true },
      ],
      calendarEvents: [
        { id: "e1", title: "Design review — browser UI", time: "10:00 AM", duration: 60, attendees: ["Will", "Sarah"] },
        { id: "e2", title: "1:1 with Marcus", time: "2:00 PM", duration: 30, attendees: ["Will", "Marcus"] },
        { id: "e3", title: "Investor update call", time: "4:30 PM", duration: 60, attendees: ["Will", "Team"] },
      ],
      inboxHighlights: [
        { id: "h1", subject: "Re: Sterling Search seed round", from: "investor@vc.com", preview: "Thanks for the deck — can we schedule a follow-up..." },
        { id: "h2", subject: "Granola — your meeting notes are ready", from: "noreply@granola.so", preview: "Your notes from yesterday's product sync are ready to review..." },
      ],
      savedCount: 24,
      memoryCount: 8,
    },
  });

  console.log("✓ Daily brief seeded");

  // ─────────────────────────────────────────
  // TODO ITEMS
  // ─────────────────────────────────────────
  await prisma.todoItem.deleteMany({ where: { userId: user.id } });

  const todosData = [
    { title: "Finalize agent task spec",            isDone: false, source: "product-sync-q1",    dueAt: daysAgo(-1) },
    { title: "Review Sarah's design token audit",   isDone: false, source: "product-sync-q1",    dueAt: daysAgo(-1) },
    { title: "Merge browser spaces PR",             isDone: true,  source: "github",             dueAt: null },
    { title: "Read Tyranny of the Explicit essay",  isDone: false, source: "longreads",          dueAt: null },
    { title: "Set up SSE proof of concept",         isDone: false, source: "product-sync-q1",    dueAt: daysAgo(-3) },
    { title: "Organize guitar samples into folders",isDone: false, source: "agent-task",         dueAt: null },
    { title: "Write weekly PKM review",             isDone: false, source: "pkm-note",           dueAt: daysAgo(0) },
    { title: "Tag unprocessed items in inbox",      isDone: true,  source: "daily-brief",        dueAt: null },
  ];

  for (const todo of todosData) {
    await prisma.todoItem.create({
      data: { userId: user.id, title: todo.title, isDone: todo.isDone, source: todo.source, dueAt: todo.dueAt },
    });
  }

  console.log(`✓ ${todosData.length} todo items seeded`);

  // ─────────────────────────────────────────
  // SEARCH QUERIES
  // ─────────────────────────────────────────
  const searchQueriesData = [
    { query: "ai browser agents architecture", resultCount: 5 },
    { query: "react prompting pattern", resultCount: 3 },
    { query: "variable fonts performance", resultCount: 2 },
    { query: "guitar samples acoustic fingerpicking", resultCount: 4 },
    { query: "second brain pkm system", resultCount: 6 },
    { query: "design tokens stripe", resultCount: 2 },
    { query: "boom bap drum loops sp404", resultCount: 3 },
  ];

  await prisma.searchQuery.deleteMany({ where: { userId: user.id } });
  for (let i = 0; i < searchQueriesData.length; i++) {
    await prisma.searchQuery.create({
      data: {
        userId: user.id,
        query: searchQueriesData[i].query,
        resultCount: searchQueriesData[i].resultCount,
        createdAt: hoursAgo(i * 6),
      },
    });
  }

  console.log(`✓ ${searchQueriesData.length} search queries seeded`);

  // ─────────────────────────────────────────
  // WHITEBOARD
  // ─────────────────────────────────────────
  await prisma.whiteboard.deleteMany({ where: { userId: user.id } });

  const whiteboard = await prisma.whiteboard.create({
    data: {
      userId: user.id,
      title: "AI Agent Architecture — Brainstorm",
      description: "Planning session for Sterling's agent task execution engine",
      items: [],
    },
  });

  const whiteboardItems = [
    { type: "NOTE" as const, content: "Agent Loop\n\nREASON → ACT → OBSERVE → REPEAT", x: 100, y: 100, width: 200, height: 120, color: "#F0FF31", rotation: 0 },
    { type: "NOTE" as const, content: "Task Status\nQUEUED → RUNNING\n→ DONE / FAILED", x: 360, y: 100, width: 180, height: 100, color: "#00E0FF", rotation: -2 },
    { type: "NOTE" as const, content: "SSE streaming for live progress updates", x: 580, y: 80, width: 200, height: 80, color: "#FAFAF7", rotation: 1 },
    { type: "LINK" as const, content: "https://arxiv.org/abs/2210.03629", x: 100, y: 280, width: 220, height: 60, color: null, rotation: 0 },
    { type: "NOTE" as const, content: "Tool types:\n- Browser control\n- File I/O\n- Web search\n- Memory read/write", x: 360, y: 260, width: 190, height: 130, color: "#7A5AF8", rotation: 0 },
    { type: "SKETCH" as const, content: null, x: 620, y: 200, width: 300, height: 200, color: "#0A0A0A", rotation: 0 },
  ];

  for (const item of whiteboardItems) {
    await prisma.whiteboardItem.create({
      data: { whiteboardId: whiteboard.id, ...item },
    });
  }

  console.log(`✓ 1 whiteboard with ${whiteboardItems.length} items seeded`);

  // ─────────────────────────────────────────
  // INTEGRATION ACCOUNTS
  // ─────────────────────────────────────────
  await prisma.integrationAccount.deleteMany({ where: { userId: user.id } });

  const integrationsData = [
    { provider: IntegrationProvider.GMAIL,        isActive: true,  indexing: false, lastSync: hoursAgo(1)  },
    { provider: IntegrationProvider.GOOGLE_DRIVE, isActive: true,  indexing: false, lastSync: hoursAgo(2)  },
    { provider: IntegrationProvider.NOTION,       isActive: true,  indexing: false, lastSync: daysAgo(1)   },
    { provider: IntegrationProvider.GITHUB,       isActive: true,  indexing: false, lastSync: hoursAgo(6)  },
    { provider: IntegrationProvider.CALENDAR,     isActive: true,  indexing: false, lastSync: hoursAgo(0.5)},
    { provider: IntegrationProvider.SLACK,        isActive: false, indexing: false, lastSync: null         },
    { provider: IntegrationProvider.DROPBOX,      isActive: false, indexing: false, lastSync: null         },
  ];

  for (const integration of integrationsData) {
    await prisma.integrationAccount.create({
      data: { userId: user.id, ...integration },
    });
  }

  console.log(`✓ ${integrationsData.length} integration accounts seeded`);

  // ─────────────────────────────────────────
  // REPORTS
  // ─────────────────────────────────────────
  await prisma.report.deleteMany({ where: { userId: user.id } });

  await prisma.report.create({
    data: {
      userId: user.id,
      title: "AI Browser Agents in 2024: Architecture Patterns & Benchmarks",
      summary: "A synthesis of 7 sources from your library covering the current state of LLM-driven browser automation, dominant architectural patterns, and open research problems.",
      content: `# AI Browser Agents in 2024\n\n## Executive Summary\nLLM-powered browser agents have matured significantly in the past 18 months. Two architectural patterns have emerged as dominant: structured DOM representation and the ReAct reasoning loop. Leading systems achieve 85–90% success on standardized benchmarks.\n\n## Browser Control Architectures\n\nThe key innovation across recent papers is the separation of concerns between visual rendering and action affordances. Rather than feeding raw screenshots or HTML to the model, modern systems construct action trees — graphs of interactive elements with typed affordances...\n\n## Benchmark Results\n\n| System | WebArena | MiniWoB++ | GAIA |\n|--------|----------|-----------|------|\n| WebAgent | 89.4% | 94.2% | 71.3% |\n| browser-use | 82.1% | 88.7% | 65.9% |\n| GPT-4 (baseline) | 61.3% | 74.2% | 53.1% |\n\n## Open Problems\n\n1. **Dynamic content handling** — SPAs and infinite scroll remain challenging\n2. **Multi-tab coordination** — most systems assume single active tab\n3. **Action verification** — confirming success without re-rendering\n\n## Implications for Sterling\n\nSterling's agent module should implement the ReAct loop with typed browser primitives. SSE progress streaming (confirmed in Q1 sync) will provide the real-time feedback loop necessary for long-running tasks.`,
      topicId: null,
      sourceCount: 7,
    },
  });

  console.log("✓ 1 report seeded");

  // ─────────────────────────────────────────
  // DONE
  // ─────────────────────────────────────────
  console.log("\n✅ Sterling Search seed complete!");
  console.log("   User:     will@sterling.app");
  console.log("   Password: sterling123");
  console.log(`   Items:    ${savedItemsData.length} saved items`);
  console.log(`   Topics:   ${topicsData.length} topics`);
  console.log(`   Spaces:   3 browser spaces`);
  console.log(`   Tasks:    ${agentTasksData.length} agent tasks`);
  console.log(`   Memory:   ${memoriesData.length} entries`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
