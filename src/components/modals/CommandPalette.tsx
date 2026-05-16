'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '../ui/Icon';

interface Command {
  sec: string;
  label: string;
  icon: string;
  href?: string;
  action?: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
  onUpload?: () => void;
  onAsk?: () => void;
}

export function CommandPalette({ onClose, onUpload, onAsk }: CommandPaletteProps) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const router = useRouter();

  const all: Command[] = [
    { sec: 'Go', label: 'Go to Inbox · auto-organize',    icon: 'inbox',      href: '/organize' },
    { sec: 'Go', label: 'Go to Library',                   icon: 'library',    href: '/library' },
    { sec: 'Go', label: 'Go to Topics',                    icon: 'topics',     href: '/topics' },
    { sec: 'Go', label: 'Go to Spaces & tabs',             icon: 'spaces',     href: '/spaces' },
    { sec: 'Go', label: 'Go to Whiteboards',               icon: 'whiteboard', href: '/whiteboard' },
    { sec: 'Go', label: 'Go to Memory',                    icon: 'memory',     href: '/memory' },
    { sec: 'Go', label: 'Go to Agent tasks',               icon: 'agent',      href: '/agent' },
    { sec: 'Go', label: 'Go to Reports',                   icon: 'reports',    href: '/reports' },
    { sec: 'Go', label: 'Go to Settings',                  icon: 'settings',   href: '/settings' },
    { sec: 'Do', label: 'Save a file or link',             icon: 'upload',     action: () => { onUpload?.(); onClose(); } },
    { sec: 'Do', label: 'Tidy open tabs',                  icon: 'sparkle',    href: '/spaces' },
    { sec: 'Do', label: 'Find duplicates and merge',       icon: 'agent',      href: '/agent' },
    { sec: 'Ask', label: 'Ask: what did I save yesterday?', icon: 'ask',       action: () => { onAsk?.(); onClose(); } },
    { sec: 'Ask', label: 'Ask: every 96 BPM sample I have',icon: 'ask',       action: () => { onAsk?.(); onClose(); } },
  ];

  const filtered = q
    ? all.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))
    : all;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(filtered.length - 1, i + 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); }
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filtered[idx];
        if (cmd) {
          if (cmd.action) cmd.action();
          else if (cmd.href) { router.push(cmd.href); onClose(); }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, idx, router, onClose]);

  const run = (cmd: Command) => {
    if (cmd.action) cmd.action();
    else if (cmd.href) { router.push(cmd.href); onClose(); }
  };

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-box" onClick={e => e.stopPropagation()}>
        <div className="cmd-input">
          <Icon name="search" size={14} color="var(--ink-3)" />
          <input
            autoFocus
            placeholder="Type a command, ask, or jump anywhere…"
            value={q}
            onChange={e => { setQ(e.target.value); setIdx(0); }}
          />
          <span className="tb-kbd">esc</span>
        </div>
        <div className="cmd-list">
          {filtered.map((c, i) => (
            <div
              key={i}
              className={`cmd-row ${i === idx ? 'on' : ''}`}
              onMouseEnter={() => setIdx(i)}
              onClick={() => run(c)}
            >
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
