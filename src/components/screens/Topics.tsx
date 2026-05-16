'use client';

import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { Chip } from '../ui/Chip';
import { SEED_TOPICS } from '@/lib/seed-data';

function TopicCard({ topic }: { topic: typeof SEED_TOPICS[0] }) {
  const hot = ['AI Browsers', 'Guitar Samples', 'Design Systems'].includes(topic.name);
  return (
    <div
      className="topic-card"
      style={hot ? { background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)' } : {}}
    >
      <div className="h">
        <div className="mono uppercase tiny" style={{ color: hot ? 'var(--accent)' : 'var(--ink-3)' }}>
          {topic.parent}
        </div>
        <div className="mono tnum" style={{ fontSize: 11, color: hot ? 'var(--ink-4)' : 'var(--ink-2)' }}>
          {String(topic.count).padStart(2, '0')}
        </div>
      </div>
      <div className="n" style={{ color: hot ? 'var(--bg)' : 'var(--ink)' }}>{topic.name}</div>
      <div>
        <div className="subs">
          {topic.subs.map(s => (
            <span key={s} className="chip" style={{
              borderColor: hot ? 'rgba(255,255,255,0.2)' : 'var(--line-soft)',
              background: hot ? 'transparent' : 'var(--bg)',
              color: hot ? 'var(--bg)' : 'var(--ink-2)',
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScreenTopics() {
  const grouped = SEED_TOPICS.reduce<Record<string, typeof SEED_TOPICS>>((acc, t) => {
    (acc[t.parent] ||= []).push(t);
    return acc;
  }, {});

  const totalItems = SEED_TOPICS.reduce((a, t) => a + t.count, 0);

  return (
    <div className="page">
      <PageHeader
        kicker="By meaning · AI"
        title="Topics that"
        em="emerged."
        sub={`${SEED_TOPICS.length} auto-generated folders · ${totalItems} items organized · you can override anything`}
        actions={
          <>
            <button className="btn ghost"><Icon name="sparkle" size={12} /> Suggest new</button>
            <button className="btn"><Icon name="plus" size={12} /> New folder</button>
          </>
        }
      />
      <div className="page-body" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {Object.entries(grouped).map(([parent, list]) => (
          <div key={parent}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12, paddingBottom: 8, borderBottom: '0.5px solid var(--line-soft)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                {parent}
              </div>
              <div className="mono dim tnum" style={{ fontSize: 10.5 }}>
                · {list.length} folders · {list.reduce((a, t) => a + t.count, 0)} items
              </div>
            </div>
            <div className="topic-grid">
              {list.map(t => <TopicCard key={t.id} topic={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
