'use client';

import { useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '../ui/Icon';

const CRUMBS: Record<string, string[]> = {
  '/':           ['HOME', 'Brief'],
  '/organize':   ['INBOX', 'Auto-organization · live'],
  '/library':    ['FIND', 'Library'],
  '/topics':     ['FIND', 'Topics · AI'],
  '/filetype':   ['FIND', 'By file type'],
  '/spaces':     ['WORK', 'Spaces & tabs'],
  '/whiteboard': ['WORK', 'Whiteboards', 'Sterling memory v2'],
  '/agent':      ['WORK', 'Agent · tasks'],
  '/reports':    ['WORK', 'Reports'],
  '/todo':       ['WORK', 'To-do list'],
  '/memory':     ['YOU', 'Memory'],
  '/settings':   ['YOU', 'Integrations'],
};

interface TopBarProps {
  query: string;
  setQuery: (q: string) => void;
  onCmd: () => void;
  onUpload: () => void;
  onAsk: () => void;
  askOpen: boolean;
}

export function TopBar({ query, setQuery, onCmd, onUpload, onAsk, askOpen }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const crumbs = CRUMBS[pathname] || ['FIND', pathname.replace('/', '').replace('-', ' ')];

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="topbar">
      <div className="tb-crumbs">
        <Icon name="arrowL" size={12} color="var(--ink-3)" />
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: i === crumbs.length - 1 ? 'var(--ink)' : 'var(--ink-3)', fontWeight: i === crumbs.length - 1 ? 500 : 400 }}>
              {c}
            </span>
            {i < crumbs.length - 1 && <span style={{ color: 'var(--ink-4)' }}>/</span>}
          </span>
        ))}
      </div>
      <div className="tb-search" onClick={() => inputRef.current?.focus()}>
        <Icon name="search" size={13} color="var(--ink-3)" />
        <input
          ref={inputRef}
          placeholder='Search or ask — "guitar samples 96 BPM", "what did I save yesterday"…'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && query.trim()) handleSearch(); }}
        />
        <span className="tb-kbd">⌘K</span>
      </div>
      <div className="tb-right">
        <button className="tb-btn" onClick={onCmd}>
          <Icon name="search" size={12} /> Command
        </button>
        <button className="tb-btn" onClick={onUpload}>
          <Icon name="upload" size={12} /> Save
        </button>
        <button className="tb-btn primary" onClick={onAsk}>
          <Icon name="sparkle" size={12} /> Ask {askOpen ? '·' : ''}
        </button>
      </div>
    </div>
  );
}
