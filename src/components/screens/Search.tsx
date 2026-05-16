'use client';

import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { ItemCard } from '../items/ItemCard';
import { Chip } from '../ui/Chip';
import { SEED_ITEMS, SEED_TOPICS } from '@/lib/seed-data';

const ITEMS_WITH_TIME = SEED_ITEMS.map((item, idx) => ({
  ...item,
  when: (() => {
    const h = [2,3,4,6,7,8,10,12,14,20,22,26,28,30,40,46,52,58,70,74,76,86,90,96][idx] || 24;
    return h < 24 ? `${h}h` : `${Math.round(h / 24)}d`;
  })(),
}));

interface SearchProps {
  query: string;
  onClose: () => void;
}

export function ScreenSearch({ query, onClose }: SearchProps) {
  const q = query.toLowerCase();
  const matches = ITEMS_WITH_TIME.filter(it =>
    it.title.toLowerCase().includes(q) ||
    it.tags.join(' ').toLowerCase().includes(q) ||
    it.source.toLowerCase().includes(q)
  );
  const topicMatches = SEED_TOPICS.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.subs.join(' ').toLowerCase().includes(q)
  );

  return (
    <div className="page">
      <PageHeader
        kicker={`Search · ${matches.length + topicMatches.length} results`}
        title={`"${query}"`}
        sub="across library · topics · memory · tabs · notes"
        actions={
          <button className="btn ghost" onClick={onClose}>
            <Icon name="close" size={12} /> Clear
          </button>
        }
      />
      <div className="page-body">
        {topicMatches.length > 0 && (
          <>
            <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>· Topics</div>
            <div className="topic-grid" style={{ marginBottom: 28 }}>
              {topicMatches.map(t => (
                <div key={t.id} className="topic-card">
                  <div className="h">
                    <div className="mono uppercase tiny dim">{t.parent}</div>
                    <div className="mono tnum" style={{ fontSize: 11, color: 'var(--ink-2)' }}>{String(t.count).padStart(2, '0')}</div>
                  </div>
                  <div className="n">{t.name}</div>
                  <div className="subs">
                    {t.subs.map(s => <Chip key={s}>{s}</Chip>)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>· Items ({matches.length})</div>
        <div className="lib-grid">
          {matches.map(it => <ItemCard key={it.id} item={it} />)}
        </div>
        {matches.length === 0 && topicMatches.length === 0 && (
          <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
            Nothing yet. Try asking the assistant — it can search the web.
          </div>
        )}
      </div>
    </div>
  );
}
