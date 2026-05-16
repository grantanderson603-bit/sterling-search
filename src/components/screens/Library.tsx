'use client';

import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { Chip } from '../ui/Chip';
import { PageHeader } from '../ui/PageHeader';
import { ItemCard } from '../items/ItemCard';
import { ItemRow } from '../items/ItemRow';
import { SEED_ITEMS } from '@/lib/seed-data';

const FILTERS = [
  { id: 'all',        label: 'All',       filter: () => true },
  { id: 'link',       label: 'Links',     filter: (i: typeof SEED_ITEMS[0]) => i.type === 'link' },
  { id: 'pdf',        label: 'PDFs',      filter: (i: typeof SEED_ITEMS[0]) => i.type === 'pdf' },
  { id: 'image',      label: 'Images',    filter: (i: typeof SEED_ITEMS[0]) => i.type === 'image' || i.type === 'screenshot' },
  { id: 'video',      label: 'Video',     filter: (i: typeof SEED_ITEMS[0]) => i.type === 'video' },
  { id: 'audio',      label: 'Audio',     filter: (i: typeof SEED_ITEMS[0]) => i.type === 'audio' },
  { id: 'note',       label: 'Notes',     filter: (i: typeof SEED_ITEMS[0]) => i.type === 'note' },
];

const ITEMS_WITH_TIME = SEED_ITEMS.map((item, idx) => ({
  ...item,
  when: (() => {
    const hoursAgo = [2,3,4,6,7,8,10,12,14,20,22,26,28,30,40,46,52,58,70,74,76,86,90,96][idx] || 24;
    if (hoursAgo < 24) return `${hoursAgo}h`;
    return `${Math.round(hoursAgo / 24)}d`;
  })(),
}));

export function ScreenLibrary({ view: viewProp, setView: setViewProp }: { view?: string; setView?: (v: string) => void }) {
  const [localView, setLocalView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  const view = viewProp || localView;
  const setView = setViewProp || setLocalView;

  const filterFn = FILTERS.find(f => f.id === filter)?.filter || (() => true);
  const items = ITEMS_WITH_TIME.filter(filterFn);

  return (
    <div className="page">
      <PageHeader
        kicker="Library"
        title="Everything you've"
        em="kept."
        sub={`${SEED_ITEMS.length} items · sorted by date · last save 2h ago`}
        actions={
          <>
            <button className="btn ghost"><Icon name="filter" size={12} /> Filter</button>
            <button className="btn"><Icon name="upload" size={12} /> Upload</button>
          </>
        }
      />

      <div className="filter-rail">
        {FILTERS.map(f => {
          const count = SEED_ITEMS.filter(f.filter).length;
          return (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? 'solid' : ''}`}
              style={{ cursor: 'pointer', border: 0, padding: '4px 10px', fontSize: 11 }}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="tnum dim" style={{ marginLeft: 6, opacity: 0.65 }}>{count}</span>
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <div className="seg">
          <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}>
            <Icon name="grid" size={11} /> Grid
          </button>
          <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>
            <Icon name="list" size={11} /> List
          </button>
        </div>
      </div>

      <div className="page-body">
        {view === 'grid' ? (
          <div className="lib-grid">
            {items.map(it => <ItemCard key={it.id} item={it} />)}
          </div>
        ) : (
          <div className="lib-list">
            <div className="lib-list-h">
              <div />
              <div>Title</div>
              <div>Tags</div>
              <div>Topic</div>
              <div style={{ textAlign: 'right' }}>Saved</div>
              <div />
            </div>
            {items.map(it => <ItemRow key={it.id} item={it} />)}
          </div>
        )}
      </div>
    </div>
  );
}
