# Sterling Search

**An AI-powered second brain, universal file organizer, semantic search engine, browser workspace, and autonomous web assistant.**

Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and NextAuth. Inspired by the best parts of Raindrop.io, MyMind, Arc Browser, Obsidian, and Pieces OS — but distinct from all of them.

The visual design is a brutalist mono aesthetic: pure ink + paper, hairline borders, monospace labels, and a single signal accent color.

---

## What's in the box

- **Inbox · Auto-organize** — captured items stream in, get tagged, then file themselves into topic buckets live
- **Library** — grid + list views, type filters, density modes, drag-and-drop upload
- **Topics · AI** — auto-generated folders grouped by parent theme (AI, Music, Work, Design, …)
- **Spaces & tabs** — 4 workspaces with pinned tabs, tab groups, Tidy Tabs, Traffic Rules
- **Whiteboard** — sticky notes + sketches + arrows for collecting ideas while browsing
- **Agent · tasks** — supervised task queue with live log + confirmation gating on ambiguous moves
- **Memory** — editable entries with source attribution and per-source privacy toggles
- **Reports + To-dos** — pulled from saved content and connected apps
- **Dashboard / Morning Brief** — calendar, inbox highlights, priorities, proactive suggestions
- **Ask Sterling** — slide-out assistant panel with cited replies
- **Command palette** (⌘K), **Upload modal** (⌘U), **Ask toggle** (⌘J)
- **Tweaks panel** (bottom right) — accent color, dark mode, sidebar/density/view/panel position

## Tech stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: NextAuth v5 (credentials provider, JWT sessions, Prisma adapter)
- **Storage**: S3-compatible (or local filesystem fallback for dev)
- **AI Providers**: Pluggable abstraction supporting OpenAI, Anthropic, or mock (auto-selects from env)
- **Vector search**: pgvector-ready schema (`SavedItem.embedding Float[]`)
- **Validation**: Zod
- **Fonts**: Geist, JetBrains Mono, Instrument Serif

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (or Supabase, Railway, Neon — any Postgres host)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in DATABASE_URL + NEXTAUTH_SECRET
cp .env.example .env.local

# 3. Generate Prisma client and push schema
npm run db:generate
npm run db:push

# 4. Seed the database with demo content (Will Sterling + 24 items + topics + …)
npm run db:seed

# 5. Run dev server
npm run dev
```

Open `http://localhost:3000`.

### Demo login

- **Email**: `will@sterling.app`
- **Password**: `sterling123`

### Required environment variables

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — your app URL (e.g., `http://localhost:3000`)

### Optional environment variables (enable features)

- `OPENAI_API_KEY` — enables real AI classification + embeddings + ask
- `ANTHROPIC_API_KEY` — fallback chat provider
- `STORAGE_ENDPOINT`, `STORAGE_BUCKET`, `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY` — S3-compatible file storage (otherwise files saved to `public/uploads/`)
- `PINECONE_API_KEY`, `PINECONE_INDEX` — production vector search

## Project structure

```
src/
├── app/
│   ├── (app)/                    # Authenticated app routes
│   │   ├── layout.tsx            # AppShell (sidebar + topbar + ask panel)
│   │   ├── page.tsx              # Dashboard / Morning Brief
│   │   ├── organize/             # Auto-organization live feed (hero)
│   │   ├── library/              # Library grid + list
│   │   ├── topics/               # AI-generated topic folders
│   │   ├── spaces/               # Browser workspace
│   │   ├── whiteboard/           # Whiteboard canvas
│   │   ├── agent/                # Agent task queue
│   │   ├── memory/               # Memory entries + policy
│   │   ├── reports/              # Reports + to-dos
│   │   ├── todo/                 # Same view, focused on todos
│   │   ├── settings/             # Integrations
│   │   └── search/               # Search results page
│   ├── (auth)/login/             # Sign-in
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth handlers
│   │   ├── items/                # Saved item CRUD
│   │   ├── topics/               # Topic CRUD
│   │   ├── memory/               # Memory entries
│   │   ├── search/               # Search (text-based fallback)
│   │   ├── upload/               # File + URL capture (with hash dedupe)
│   │   ├── ask/                  # Ask Sterling (RAG over saved items)
│   │   └── agent/                # Agent tasks
│   ├── layout.tsx                # Root layout (fonts + globals)
│   └── globals.css               # Brutalist mono design system
├── components/
│   ├── layout/                   # AppShell, Sidebar, TopBar, AskPanel
│   ├── modals/                   # CommandPalette, UploadModal
│   ├── screens/                  # All page-level screens
│   ├── items/                    # ItemCard, ItemRow, Thumb (with mocks)
│   └── ui/                       # Icon, Chip, Toggle, PageHeader
├── lib/
│   ├── prisma.ts                 # PrismaClient singleton
│   ├── auth.ts                   # NextAuth config
│   ├── ai.ts                     # AI provider abstraction
│   ├── storage.ts                # Storage abstraction
│   └── seed-data.ts              # Static seed data used by client screens
└── types/
    └── index.ts
prisma/
├── schema.prisma                 # 22 models + 6 enums
└── seed.ts                       # Demo database seeder
```

## Database schema

22 models implementing the full spec:

- **Auth**: User, Account, Session, VerificationToken
- **Content**: SavedItem (with `embedding Float[]` for pgvector), Folder, Topic, Tag
- **Memory & Search**: MemoryEntry, SearchQuery, AssistantMessage
- **Browser workspace**: BrowserSpace, BrowserTab, TabGroup, TrafficRule
- **Whiteboard**: Whiteboard, WhiteboardItem
- **Agent**: AgentTask (with structured log JSON)
- **Integrations**: IntegrationAccount
- **Daily brief**: DailyBrief
- **Tasks & reports**: TodoItem, Report

## What works now

- Full UI, all 13 main screens + login, pixel-matched to the design prototype
- Complete database schema with seed data (24 items, 14 topics, 4 spaces, 5 agent tasks, 7 memories, full daily brief)
- Authentication (credentials provider, password hashing, JWT sessions)
- API routes for items, topics, memory, search, upload, ask, agent
- File upload with SHA-256 hash deduplication
- Provider abstractions for AI (OpenAI/Anthropic/mock) and storage (S3/local)
- Real-time auto-organization animation on the Inbox screen
- Working command palette, upload modal, ask panel
- Live tweaks panel (theme, palette, density, sidebar, view, ask position)
- Global keyboard shortcuts: ⌘K (command), ⌘J (ask), ⌘U (upload), ⌘. (collapse sidebar)

## What requires external setup

- **Database**: Provision PostgreSQL anywhere (Supabase, Neon, Railway, local Docker)
- **AI features**: Add `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` for real classification, embeddings, and answers
- **File storage**: Falls back to `public/uploads/` for dev. Set `STORAGE_*` for S3
- **Vector search**: Schema is ready (`pgvector`). Enable the extension in Postgres and add Pinecone keys if preferred
- **Integrations**: OAuth flows for Gmail, GitHub, Notion, etc. are stubbed — wire up your own OAuth apps
- **Browser workspace**: UI is complete; tabs are stored as JSON. Wire up a browser extension or Electron shell for actual browser control
- **Agent**: Task queue UI is complete; plug in BullMQ, Inngest, or Trigger.dev for background execution

## Deploy

This project deploys cleanly to:

- **Vercel** (recommended): `vercel deploy`. Set env vars in the dashboard.
- **Railway / Render / Fly.io**: standard Next.js build (`npm run build` + `npm start`)
- **Supabase**: use Supabase Auth + Storage + Postgres for the full stack

The Prisma schema works with any Postgres provider. Run `npm run db:push` after first deploy.

## What to build next

1. Wire up real OAuth integrations (Gmail, GitHub, Notion, Slack, Calendar)
2. Background job queue (BullMQ or Inngest) for embedding + classification on save
3. Browser extension (Chrome/Safari/Arc) for one-click capture
4. iOS share extension for mobile capture
5. Replace text search with pgvector cosine similarity over `SavedItem.embedding`
6. Live whiteboard collaboration (CRDTs + websockets)
7. MCP server for agent tool-use
8. Real browser workspace (Electron with Chromium embedding)
