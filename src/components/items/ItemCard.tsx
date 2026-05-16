'use client';

import { Thumb } from './Thumb';
import { Chip } from '../ui/Chip';

interface Item {
  id: string;
  type: string;
  title: string;
  source: string;
  tags: string[];
  color?: string;
  when?: string;
  savedAt?: Date | string;
}

const TYPE_LABELS: Record<string, string> = {
  link: 'LINK', pdf: 'PDF', image: 'IMG', screenshot: 'SCN',
  video: 'VID', audio: 'WAV', note: 'NTE', download: 'DL',
};

function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 60000;
  if (diff < 1) return 'now';
  if (diff < 60) return `${Math.round(diff)}m`;
  if (diff < 60 * 24) return `${Math.round(diff / 60)}h`;
  return `${Math.round(diff / 60 / 24)}d`;
}

export function ItemCard({ item, onOpen }: { item: Item; onOpen?: (item: Item) => void }) {
  const typeLabel = TYPE_LABELS[item.type] || 'DOC';
  const when = item.when || (item.savedAt ? timeAgo(item.savedAt) : '');

  return (
    <div className="lib-card" onClick={() => onOpen?.(item)}>
      <div className="badge">{typeLabel}</div>
      <Thumb item={item} />
      <div className="meta">
        <div className="ttl">{item.title}</div>
        <div className="src">
          <span>{item.source}</span>
          <span style={{ color: 'var(--ink-4)' }}>·</span>
          <span className="tnum">{when}</span>
        </div>
        <div className="tags">
          {item.tags.slice(0, 3).map((t, i) => <Chip key={i}>{t}</Chip>)}
        </div>
      </div>
    </div>
  );
}
