export type ItemType = 'link' | 'pdf' | 'image' | 'video' | 'audio' | 'note' | 'screenshot' | 'download';
export type TaskStatus = 'queued' | 'running' | 'done' | 'failed' | 'cancelled';
export type MessageRole = 'user' | 'assistant';

export interface SavedItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: ItemType;
  mimeType?: string;
  source: string;
  url?: string;
  contentText?: string;
  fileKey?: string;
  fileSize?: number;
  hash?: string;
  topics: string[];
  tags: string[];
  suggestedFolder?: string;
  suggestedSubfolder?: string;
  isStarred: boolean;
  color?: string;
  createdAt: Date;
  savedAt: Date;
}

export interface Topic {
  id: string;
  userId: string;
  name: string;
  parent: string;
  count: number;
  subs: string[];
  createdAt: Date;
}

export interface MemoryEntry {
  id: string;
  userId: string;
  content: string;
  source: string;
  tags: string[];
  createdAt: Date;
}

export interface AgentTask {
  id: string;
  userId: string;
  title: string;
  status: TaskStatus;
  step: string;
  progress: number;
  result?: string;
  log: AgentLogEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentLogEntry {
  ts: string;
  message: string;
  level?: 'info' | 'warn' | 'error';
}

export interface BrowserSpace {
  id: string;
  userId: string;
  name: string;
  color: string;
  pinned: PinnedTab[];
  groups: TabGroup[];
  archived: ArchivedTab[];
}

export interface PinnedTab {
  fav: string;
  title: string;
  url: string;
}

export interface TabGroup {
  name: string;
  color: string;
  tabs: BrowserTab[];
}

export interface BrowserTab {
  fav: string;
  title: string;
  url: string;
}

export interface ArchivedTab {
  fav: string;
  title: string;
  url: string;
  archivedAt: string;
}

export interface AssistantMessage {
  role: MessageRole;
  text: string;
  cites?: Citation[];
  follow?: string;
}

export interface Citation {
  id?: string;
  label: string;
  tag: string;
}

export interface BriefData {
  greeting: string;
  priorities: string[];
  calendar: CalendarEvent[];
  inbox: InboxItem[];
  counts: {
    saved: number;
    this_week: number;
    this_month: number;
    memory: number;
  };
}

export interface CalendarEvent {
  t: string;
  title: string;
  dur: string;
}

export interface InboxItem {
  who: string;
  txt: string;
}

export interface SearchResult {
  items: SavedItem[];
  topics: Topic[];
  query: string;
}

export interface ThemeSettings {
  palette: 'lime' | 'cyan' | 'orange' | 'violet' | 'mono';
  dark: boolean;
  sidebar: 'expanded' | 'collapsed';
  view: 'grid' | 'list';
  density: 'regular' | 'dense';
  panel: 'right' | 'bottom';
}
