'use client';

import { Chip } from '../ui/Chip';
import { Icon } from '../ui/Icon';
import { SEED_TOPICS } from '@/lib/seed-data';

interface Item {
  id: string;
  type: string;
  title: string;
  source: string;
  tags: string[];
  topics: string[];
  when?: string;
  savedAt?: Date | string;
}

const TYPE_LABELS: Record<string, string> = {
  link: 'LNK', pdf: 'PDF', image: 'IMG', screenshot: 'SCN',
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

export function ItemRow({ item, onOpen }: { item: Item; onOpen?: (item: Item) => void }) {
  const typeLabel = TYPE_LABELS[item.type] || 'DOC';
  const when = item.when || (item.savedAt ? timeAgo(item.savedAt) : '');
  const topicName = SEED_TOPICS.find(t => t.id === item.topics?.[0])?.name || '';

  return (
    <div className="lib-row" onClick={() => onOpen?.(item)}>
      <div className="row-type">{typeLabel}</div>
      <div className="row-ttl">
        <b>{item.title}</b>
        <div className="row-sub">{item.source}</div>
      </div>
      <div className="row-tags">
        {item.tags.slice(0, 3).map((t, i) => <Chip key={i}>{t}</Chip>)}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-2)' }}>
        {topicName}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase' }}>
        {when} AGO
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Icon name="star" size={13} color="var(--ink-3)" />
      </div>
    </div>
  );
}
