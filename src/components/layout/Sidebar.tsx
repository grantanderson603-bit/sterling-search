'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '../ui/Icon';
import { SEED_ITEMS, SEED_TOPICS, SEED_MEMORIES, SEED_SPACES } from '@/lib/seed-data';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  count?: number;
  badge?: string;
  kbd?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const SIDEBAR: NavGroup[] = [
  { group: 'Capture', items: [
    { id: 'organize', label: 'Inbox · Auto-organize', icon: 'inbox',  href: '/organize', count: 14, badge: 'live' },
    { id: 'upload',   label: 'Upload',                icon: 'upload', href: '#upload' },
  ]},
  { group: 'Find', items: [
    { id: 'library',  label: 'Library',      icon: 'library',  href: '/library',  count: SEED_ITEMS.length },
    { id: 'topics',   label: 'Topics · AI',  icon: 'topics',   href: '/topics',   count: SEED_TOPICS.length },
    { id: 'filetype', label: 'By file type', icon: 'type',     href: '/filetype' },
    { id: 'ask',      label: 'Ask Sterling', icon: 'ask',      href: '#ask',      kbd: '⌘K' },
  ]},
  { group: 'Work', items: [
    { id: 'spaces',     label: 'Spaces & tabs',icon: 'spaces',     href: '/spaces',     count: SEED_SPACES.length },
    { id: 'whiteboard', label: 'Whiteboards',  icon: 'whiteboard', href: '/whiteboard', count: 7 },
    { id: 'agent',      label: 'Agent · tasks',icon: 'agent',      href: '/agent',      count: 6 },
    { id: 'reports',    label: 'Reports',      icon: 'reports',    href: '/reports',    count: 3 },
    { id: 'todo',       label: 'To-do list',   icon: 'todo',       href: '/todo',       count: 4 },
  ]},
  { group: 'You', items: [
    { id: 'memory',   label: 'Memory',       icon: 'memory',   href: '/memory',   count: SEED_MEMORIES.length },
    { id: 'settings', label: 'Integrations', icon: 'settings', href: '/settings' },
  ]},
];

interface SidebarProps {
  onBrandClick?: () => void;
  onUpload?: () => void;
  onAsk?: () => void;
  collapsed?: boolean;
}

export function Sidebar({ onBrandClick, onUpload, onAsk, collapsed }: SidebarProps) {
  const pathname = usePathname();

  const handleClick = (href: string, e: React.MouseEvent) => {
    if (href === '#upload') { e.preventDefault(); onUpload?.(); }
    if (href === '#ask')    { e.preventDefault(); onAsk?.(); }
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="sidebar">
      <div className="sb-brand" onClick={onBrandClick}>
        <div className="sb-mark">S</div>
        <span className="sb-name">STERLING</span>
        <span className="sb-version">v1.4 · β</span>
      </div>

      {SIDEBAR.map((group, gi) => (
        <div className="sb-group" key={gi}>
          <div className="sb-group-h">
            <span>{group.group}</span>
            {gi === 0 && <span style={{ color: 'var(--ok)' }}>● live</span>}
          </div>
          {group.items.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={`sb-item ${isActive(item.href) ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
              onClick={(e) => handleClick(item.href, e)}
            >
              <span className="sb-icon"><Icon name={item.icon} size={14} stroke={1.25} /></span>
              <span className="sb-item-label">{item.label}</span>
              {item.kbd && <span className="sb-count mono">{item.kbd}</span>}
              {item.badge === 'live' && <span className="sb-count" style={{ color: 'var(--ok)' }}>● {item.count}</span>}
              {item.count != null && item.badge !== 'live' && <span className="sb-count">{item.count}</span>}
            </Link>
          ))}
        </div>
      ))}

      <div style={{ flex: 1 }} />
      <div style={{ padding: '10px 16px', borderTop: '0.5px solid var(--line-soft)', display: collapsed ? 'none' : 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 24, height: 24, background: 'var(--bg-2)', border: '0.5px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11, flexShrink: 0 }}>W</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11.5, fontWeight: 500 }}>Will Sterling</div>
          <div className="mono dim" style={{ fontSize: 10 }}>will@sterling.app · pro</div>
        </div>
        <Link href="/settings">
          <Icon name="settings" size={13} color="var(--ink-3)" />
        </Link>
      </div>
    </aside>
  );
}
