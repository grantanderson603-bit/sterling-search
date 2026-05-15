# Auto-organizing inbox UI

_Started 2026-05-15 23:19 UTC_

---

## User

GitHub connected

## User

<pasted_text name="Pasted text (813 lines)">


# SERENITY Perplexity refined App prompt

You are an elite AI product architect, full-stack engineer, backend engineer, frontend designer, database architect, AI systems engineer, and production deployment specialist.

Build a production-ready full-stack app called Sterling Search.

Sterling Search is an AI-powered second brain, universal file organizer, semantic search engine, browser workspace, and autonomous web assistant. It should not be a clone of [Raindrop.io](http://Raindrop.io), MyMind, Arc Browser, Obsidian, or Pieces OS, but it should be inspired by the best parts of each.

The goal is to help users save, organize, search, recall, and act on everything they collect online and across their apps.

## Product Vision

Sterling Search should let users capture anything from anywhere, automatically organize it with AI, and retrieve it later using natural language or voice.

Users should be able to save and search:

- Files

- Links

- PDFs

- Images

- Videos

- Audio files

- Screenshots

- Web captures

- Browser tabs

- Notes

- Downloads

- Connected app data from Gmail, Google Calendar, Notion, Slack, GitHub, Google Drive, Dropbox, and similar services

The app should feel like:

- [Raindrop.io](http://Raindrop.io) for saving and searching links/files

- MyMind for beautiful AI-powered auto-organization

- Obsidian for second-brain knowledge management

- Pieces OS for long-term memory and activity recall

- Arc Browser for workspaces, pinned tabs, split view, and browser organization

- Modern AI browser agents for autonomous web tasks

## Core Requirements

Build a real, functional, production-quality app with both frontend and backend.

Do not create only a mockup, prototype, landing page, or static demo. The app must include real data persistence, authentication, file storage, database models, API routes, AI-ready architecture, and a polished responsive UI.

If a feature requires external credentials, APIs, OAuth, browser permissions, iOS native capabilities, or third-party services that cannot be fully completed in the current environment, implement the full integration architecture, database schema, backend endpoints, UI flows, configuration placeholders, and clear setup instructions so the feature can be activated with real credentials.

## Main Features

### 1. Universal Capture

Users should be able to save content into Sterling Search from multiple sources.

Build support for:

- File upload

- Drag-and-drop upload

- URL saving

- Web clipper/browser-extension-ready architecture

- Screenshot or web capture-ready architecture

- iOS share-extension-ready architecture

- Future connected app imports

For every uploaded or saved item, the backend should process and store:

- Title

- Description or summary

- File type

- MIME type

- Source

- Original URL if applicable

- Upload date

- Created date

- Tags

- AI-generated topics

- Suggested folder

- Suggested subfolder

- Content text where extractable

- Embedding/vector-search-ready field

- Duplicate fingerprint or hash

### 2. AI Auto-Organization

Sterling Search should automatically organize saved items in two parallel ways.

#### View A: By File Type

Examples:

- Documents

  - PDFs

  - Word docs

  - Spreadsheets

- Media

  - Images

  - Videos

  - Audio

- Links

- Screenshots

- Downloads

- Notes

- Captures

#### View B: By Content Meaning

Examples:

- AI

  - AI Browsers

  - AI Productivity

  - AI Agents

- Music

  - Guitar Samples

  - Drum Loops

  - 90-100 BPM

- Work

  - GitHub

  - Product Specs

  - Meeting Notes

The user should be able to switch between these views.

The system should:

- Create folders and subfolders automatically

- Generate tags

- Generate summaries

- Detect duplicates

- Suggest better organization

- Allow manual edits

- Preserve user overrides

### 3. Semantic Search and Ask Assistant

Build a conversational AI search assistant.

Users should be able to ask questions like:

- “Find everything I saved last week about AI browsers.”

- “Show me all screenshots related to app design.”

- “Find all guitar samples from 90 to 100 BPM.”

- “Summarize my saved PDFs about productivity.”

- “Find and delete duplicate files.”

- “Create a report about my recent AI browser research.”

The assistant should support:

- Natural language search

- Semantic search architecture

- Keyword search

- Filters by type, date, topic, tag, source, and folder

- Voice-input-ready UI

- Search result citations back to saved items

- Summaries of retrieved content

If a live LLM/vector database integration is available, implement it. If not, create a provider abstraction that supports OpenAI, Anthropic, local models, and future embedding/vector providers.

### 4. Long-Term Memory

Build a privacy-controlled memory layer.

The app should remember user-approved information such as:

- Saved content

- Recent activity

- User preferences

- Organization preferences

- Reusable tasks

- Highlighted text added to memory

- Notes and summaries

Users should be able to:

- Enable or disable memory

- Add something to memory manually

- Review memory entries

- Edit memory entries

- Delete memory entries

- Pause memory collection

- Control which sources are indexed

The app should support questions like:

- “What did I work on today?”

- “Show me what I saved yesterday.”

- “What AI browser research have I collected recently?”

- “What did I decide about this project last week?”

### 5. Browser Workspace

Create a browser-workspace section inside the app.

If a full Chromium browser cannot be embedded in the current platform, build the browser workspace as a web-based command center with architecture ready for a future Electron, Chromium, or browser-extension implementation.

Include:

- Spaces/workspaces

- Sidebar tabs

- Pinned tabs

- Tab groups

- Split-view-ready layout

- Archived tabs

- Tidy Tabs button

- Library

- Whiteboards

- Traffic Control rules

- AI tab organization

#### Pinned Tabs

Pinned tabs should:

- Live at the top of the sidebar

- Belong to a specific space

- Be grouped into folders or stand alone

- Never auto-archive

- Behave like a cross between apps and bookmarks

#### Tidy Tabs

When the user has more than 6 tabs open, a Tidy Tabs button should organize today’s tabs by topic, website, project, or intent and intelligently name each group.

#### Traffic Control

Build a Traffic Control feature that routes links to the right workspace.

Rules may be based on:

- Domain

- URL pattern

- Content topic

- File type

- App source

- Workspace

- User preference

Example:

- Google Sheets links open in Work

- GitHub PRs open in Development

- Notion specs open in Product

- AI articles open in Research

### 6. Library

Create a Library section that stores everything the user has:

- Visited

- Downloaded

- Created

- Saved

- Captured

- Archived

Library sections:

1. Media

2. Downloads

3. Whiteboards and Notes

4. Spaces and Tabs

5. Archived Tabs

The Library should be searchable and filterable.

### 7. Whiteboards

Build a Whiteboard feature for collecting ideas while browsing.

Users should be able to:

- Create whiteboards

- Add text notes

- Add links

- Add images

- Add web snippets

- Organize ideas visually

- Save whiteboards into the Library

### 8. Autonomous AI Agent Architecture

Design and implement an AI agent-ready backend.

The agent should eventually be able to:

- Search the web

- Open websites

- Fill forms

- Summarize pages

- Compare products

- Organize tabs

- Create reports

- Extract information

- Perform repetitive browser tasks

- Learn reusable workflows

For now, implement:

- Agent task model

- Agent task queue-ready architecture

- Agent command UI

- Agent activity log

- Tool/provider abstraction

- Permission and confirmation system for risky actions

- Placeholder adapters for browser automation tools, MCP servers, external APIs, and AI computer-use agents such as FAZM or similar services

### 9. Daily Brief and Proactive Assistant

Create a Morning Brief dashboard that can show:

- Calendar events

- Inbox highlights

- Key links

- Recent documents

- GitHub PRs

- Notion docs

- Relevant tabs

- Reminders

- Suggested priorities

If live integrations are unavailable, build mockable integration adapters and real setup instructions.

The assistant should also surface proactive suggestions such as:

- “You have three tabs about the same topic. Want me to group them?”

- “This page looks related to your AI browser research project.”

- “This task was mentioned yesterday. Want me to add it to your list?”

### 10. Reports and To-Do Lists

Users should be able to generate:

- Reports from saved content

- Reports from connected apps

- Interactive to-do lists

- Action-item summaries

- Decision-support summaries

The system should be able to pull or prepare to pull action items from Gmail, Notion, Slack, GitHub, Calendar, saved links, notes, and uploaded files.

## Technical Requirements

Use a modern production-ready stack.

Prefer this stack unless the platform requires another:

- Frontend: Next.js, React, TypeScript, Tailwind CSS

- Backend: Next.js API routes or Node.js backend

- Database: PostgreSQL

- ORM: Prisma or equivalent

- Auth: NextAuth, Clerk, Supabase Auth, or equivalent

- File Storage: Supabase Storage, S3-compatible storage, or local dev storage with production adapter

- Vector Search: pgvector, Pinecone, Weaviate, Qdrant, or equivalent

- AI Providers: abstraction for OpenAI, Anthropic, Gemini, local models, and embeddings

- Background Jobs: queue-ready architecture using BullMQ, Inngest, [Trigger.dev](http://Trigger.dev), or equivalent

- Deployment: Vercel, Railway, Render, Supabase, Netlify, or equivalent

## Database Models

Create database models for at least:

- User

- SavedItem

- FileAsset

- Folder

- Tag

- Topic

- Collection

- MemoryEntry

- SearchQuery

- AssistantMessage

- BrowserSpace

- BrowserTab

- TabGroup

- PinnedTab

- TrafficRule

- Whiteboard

- WhiteboardItem

- AgentTask

- AgentLog

- IntegrationAccount

- DailyBrief

- TodoItem

- Report

## UI Requirements

The app should have a polished, premium, modern interface.

Design direction:

- Beautiful and minimal like MyMind

- Organized and powerful like [Raindrop.io](http://Raindrop.io)

- Spatial and workspace-oriented like Arc

- Calm, elegant, and privacy-respecting

- Dark mode and light mode

- Responsive desktop-first layout with mobile support

- Sidebar navigation

- Command menu

- Global search

- Upload button

- Ask assistant panel

- Library

- Browser workspace

- Memory center

- Settings

Main pages:

- Dashboard

- Upload/Capture

- Library

- Search/Ask

- File Type View

- AI Topic View

- Browser Workspace

- Spaces

- Whiteboards

- Memory

- Agent Tasks

- Reports

- To-Do List

- Settings

- Integrations

## Security and Privacy Requirements

Implement privacy-first design.

Users must be able to:

- Control what gets indexed

- Disable memory

- Delete saved items

- Delete memories

- Delete uploaded files

- Disconnect integrations

- Review AI-generated metadata

- Confirm destructive actions before they happen

Do not silently delete files or take irreversible actions without confirmation.

Use secure authentication, user-scoped data access, protected API routes, environment variables for secrets, and safe file handling.

## Production Readiness

The final output should include:

- Working frontend

- Working backend

- Database schema

- Authentication

- File upload/storage flow

- Saved item management

- Search UI

- Assistant UI

- Memory UI

- Browser workspace UI

- Agent task UI

- Settings and integrations UI

- Seed data or demo data

- Environment variable examples

- Setup instructions

- Deployment instructions

- Clear notes for activating external APIs

- Error handling

- Loading states

- Empty states

- Responsive design

- Basic tests or test plan

## Important Scope Guidance

Build the most complete production-ready version possible, but if the environment cannot implement everything fully, prioritize in this order:

1. Authentication

2. Database schema

3. File upload and saved item management

4. AI metadata extraction architecture

5. File-type organization

6. AI topic organization

7. Search and Ask assistant

8. Memory center

9. Browser workspace UI

10. Library

11. Whiteboards

12. Traffic Control

13. Tidy Tabs

14. Agent task system

15. Integrations framework

16. Daily Brief

17. Reports and to-do lists

Do not skip backend implementation. Do not make only a UI mockup. Do not hardcode everything. Do not ignore persistence. Do not remove advanced features entirely; if they cannot be fully implemented now, create the architecture, models, UI, and setup path for them.

## Final Deliverable

Produce the full application with all necessary files, code, database schema, environment variables, setup instructions, and deployment instructions.

When finished, explain:

1. What was built

2. What works now

3. What requires API keys or external setup

4. How to run it locally

5. How to deploy it

6. What to build next








































</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design. Follow the instructions about design in your system prompt, particularly the 'How to do design work' section. Use the design_canvas starter component, or make a full-bleed prototype and offer options via Tweaks.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>

<attached-skill name="Design System (design system)">
[Design System] This project uses the **Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.
    
    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/6f5c9236-a034-4fca-9655-43721b55193d/`. Before producing any visuals, explore it: call `list_files("/projects/6f5c9236-a034-4fca-9655-43721b55193d/")` to see the structure, then `read_file` the README/base.md or whatever index file it has. Don't guess at the design system's contents.

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s). Before writing any `var(--*)`, look up the real name in the design system's `.css` files (`list_files` + `read_file` under `/projects/6f5c9236-a034-4fca-9655-43721b55193d/`). Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/6f5c9236-a034-4fca-9655-43721b55193d/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## User



## Assistant

_[tool: list_files]_

_[tool: questions_v2]_

Before I build, I want to set expectations and get focus right — this is a massive product spec. Let me clarify a few things up front.

**What I can produce:** A high-fidelity, interactive HTML/React prototype that *feels* like the real app — real navigation, state, animations, populated with realistic seed data. It will not be a deployable Postgres/Next.js backend — that's outside what I can build here. Think Figma-killer prototype, not shipping codebase.

The design system you linked is empty, so I'll establish the visual language from scratch (calm, minimal, MyMind/Arc-inspired).

A few questions to focus the prototype:

## User

Questions answered:
- aesthetic: 4
- shell: macOS window chrome (desktop app feel)
- hero_interaction: Auto-organization — watching new items get tagged + filed live
- density: Balanced — medium density, mixed grid + list
- imagery: Decide for me
- agent_personality: Decide for me
- tweaks: Color palette / theme, Light vs dark mode, Sidebar collapsed vs expanded, List vs grid view for Library, Density (sparse / dense), Assistant panel position (right vs bottom)
- seed_data_vibe: Decide for me — mix it up

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: write_file]_

Plenty to work with. Let me build. Starting with the visual system and shell.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: show_html]_

_[tool: done]_

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

I built **Sterling Search** as a fully interactive prototype — brutalist mono aesthetic, macOS window chrome, with the auto-organization hero as the live entry screen.

**What's in it:**
- **Inbox · Auto-organize** (the hero) — items stream in, get "ANALYZING…" tags, then file themselves into topic buckets that animate their counts. Pause/resume the live feed.
- **Library** — grid + list toggle, type filters, density modes.
- **Topics · AI** — auto-generated folders grouped by parent (AI, Music, Work, Design, etc.).
- **Spaces & tabs** — 4 spaces (Research / Work / Music / Life), pinned tabs, tab groups, Tidy Tabs button, Traffic Rules.
- **Whiteboard** — Sterling memory v2 board with sticky notes + sketches + arrows.
- **Agent · tasks** — live task queue with progress bars, plus a streaming log that pauses for your confirmation on an ambiguous dedupe.
- **Memory** — editable entries, source attribution, privacy policy toggles.
- **Reports + To-dos** — pulled from your saves.
- **Dashboard / Brief** — open it via the brand mark (top-left) for a Bento Morning Brief.
- **Ask Sterling** — slide-out panel with cited replies; type questions, get answers grounded in seed items.
- **Command palette** (⌘K), **Upload** modal (⌘U), **Ask** (⌘J).

**Tweaks** (bottom right): accent color (lime/cyan/orange/violet/mono), dark mode, sidebar collapsed/expanded, density, list/grid view, ask panel right/bottom.

**Caveats / next moves:**
- It's a prototype — no real persistence, auth, or LLM. The "production stack" architecture from your spec isn't here; if you want, I can hand off a Claude Code package with the matching schema, routes, and provider abstractions.
- The "By file type" nav item currently shows the Library — easy to split if you want a distinct view.
- I can also explore variations (different aesthetic, different hero) inside a design_canvas if you want to compare directions.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

Fixed — the 1320×920 canvas now scales to fit any viewport, with a soft paper backdrop around it. Tweaks panel inverse-scales so it stays readable.

