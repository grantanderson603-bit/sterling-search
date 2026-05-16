'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { Chip } from '../ui/Chip';
import { SEED_FEED, SEED_FEED_QUEUE, SEED_BUCKETS } from '@/lib/seed-data';

interface FeedEntry {
  id: string;
  state: 'incoming' | 'analyzing' | 'filed';
  title: string;
  src: string;
  type: string;
  tags: string[];
  bucket: string;
}

interface Bucket {
  id: string;
  name: string;
  count: number;
  recent: string[];
  hot?: boolean;
  pulse?: boolean;
}

function FeedItem({ item }: { item: FeedEntry }) {
  const tagBlock = item.state === 'incoming' ? (
    <div className="tags" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>
      READING<span className="dots" style={{ display: 'inline-block', width: 18 }} />
    </div>
  ) : item.state === 'analyzing' ? (
    <div className="tags" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink)' }}>
      <span style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '2px 5px', letterSpacing: '0.06em' }}>
        ANALYZING<span className="dots" style={{ display: 'inline-block', width: 18 }} />
      </span>
    </div>
  ) : (
    <div className="tags">
      {item.tags.slice(0, 2).map((t, i) => <Chip key={i} kind={i === 0 ? 'bold' : 'default'}>{t}</Chip>)}
      <Chip kind="accent">→ {item.bucket}</Chip>
    </div>
  );

  return (
    <div className="feed-item" data-state={item.state}>
      <div className="ico">{item.type}</div>
      <div>
        <div className="ttl">{item.title}</div>
        <div className="sub">
          <span>{item.src}</span>
          <span style={{ color: 'var(--ink-4)' }}>·</span>
          <span>
            {item.state === 'filed' ? 'FILED · now' : item.state === 'analyzing' ? 'ANALYZING' : 'INCOMING'}
          </span>
        </div>
      </div>
      {tagBlock}
    </div>
  );
}

export function ScreenOrganize() {
  const [items, setItems] = useState<FeedEntry[]>(() => SEED_FEED.map(f => ({ ...f })) as FeedEntry[]);
  const [queue, setQueue] = useState(() => [...SEED_FEED_QUEUE]);
  const [paused, setPaused] = useState(false);
  const [buckets, setBuckets] = useState<Bucket[]>(() => SEED_BUCKETS.map(b => ({ ...b })));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueRef = useRef(queue);
  queueRef.current = queue;

  useEffect(() => {
    if (paused) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function loop() {
      const next = queueRef.current.shift();
      if (!next) {
        const more = SEED_FEED_QUEUE.map((q, i) => ({ ...q, id: q.id + '-r' + Date.now() + i }));
        setQueue([...more]);
        timerRef.current = setTimeout(loop, 2200);
        return;
      }
      const incoming: FeedEntry = { ...next, state: 'incoming' };
      setItems(prev => [incoming, ...prev].slice(0, 14));

      const a = setTimeout(() => {
        setItems(prev => prev.map(it => it.id === next.id ? { ...it, state: 'analyzing' } : it));
      }, 700);

      const f = setTimeout(() => {
        setItems(prev => prev.map(it => it.id === next.id ? { ...it, state: 'filed' } : it));
        setBuckets(prev => prev.map(b =>
          b.name === next.bucket
            ? { ...b, count: b.count + 1, recent: [next.title, ...b.recent].slice(0, 2), pulse: true }
            : b
        ));
        setTimeout(() => {
          setBuckets(prev => prev.map(b => b.name === next.bucket ? { ...b, pulse: false } : b));
        }, 700);
      }, 2200);

      timeouts.push(a, f);
      timerRef.current = setTimeout(loop, 3000);
    }

    timerRef.current = setTimeout(loop, 1400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timeouts.forEach(clearTimeout);
    };
  }, [paused]);

  const sorted = [...buckets].sort((a, b) => b.count - a.count);
  const maxBucket = Math.max(...buckets.map(b => b.count));

  return (
    <div className="page">
      <div className="feed-header">
        <div>
          <div className="mono uppercase tiny dim" style={{ marginBottom: 6 }}>· Auto-Organization · Live</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em' }}>
            Watching <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Sterling</em> sort what you save.
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="feed-status">
            <span className="pulse" />
            {paused ? 'Paused' : 'Indexing'} · {buckets.length} buckets
          </div>
          <div className="seg">
            <button className={paused ? '' : 'on'} onClick={() => setPaused(false)}>Live</button>
            <button className={paused ? 'on' : ''} onClick={() => setPaused(true)}>Pause</button>
          </div>
          <button className="btn"><Icon name="filter" size={12} /> All sources</button>
        </div>
      </div>

      <div className="feed-grid">
        <div className="feed-stream">
          <div className="mono uppercase tiny dim" style={{ marginBottom: 4 }}>
            Incoming · captured, analyzed, filed · this session
          </div>
          {items.map(it => <FeedItem key={it.id} item={it} />)}
        </div>

        <div className="feed-buckets">
          <div className="mono uppercase tiny dim">Topics · auto-sorted · live counts</div>
          {sorted.map(b => (
            <div className={`bucket ${b.pulse ? 'hot' : ''}`} key={b.id}>
              <h4>
                <span>{b.name}</span>
                <span className="ct tnum">{String(b.count).padStart(2, '0')}</span>
              </h4>
              <div className="bucket-bar">
                <i style={{ width: `${(b.count / maxBucket) * 100}%` }} />
              </div>
              <div className="recent">
                {b.recent.slice(0, 2).map((r, i) => <div key={i}>· {r}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
