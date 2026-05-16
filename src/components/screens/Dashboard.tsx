'use client';

import Link from 'next/link';
import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { SEED_BRIEF } from '@/lib/seed-data';

function MiniSparkline() {
  const pts = [12, 14, 11, 18, 16, 22, 20, 24, 19, 26, 30, 28, 34, 32, 40, 44, 38, 47];
  const max = Math.max(...pts);
  const w = 240, h = 32;
  const path = pts.map((p, i) => `${i ? 'L' : 'M'} ${(i / (pts.length - 1)) * w} ${h - (p / max) * h}`).join(' ');
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ marginTop: 'auto' }}>
      <path d={path} stroke="var(--ink)" strokeWidth="1" fill="none" />
      <path d={path + ` L ${w} ${h} L 0 ${h} Z`} fill="var(--ink)" opacity="0.05" />
    </svg>
  );
}

export function ScreenDashboard({ onAsk }: { onAsk: () => void }) {
  const b = SEED_BRIEF;
  return (
    <div className="page">
      <PageHeader
        kicker="Thursday · May 15 · 09:14"
        title="Good morning,"
        em="Will."
        sub="3 priorities · 4 meetings · 47 new saves this week."
        actions={
          <>
            <Link href="/organize" className="btn ghost">
              <Icon name="inbox" size={13} /> Inbox · 14
            </Link>
            <button className="btn accent" onClick={onAsk}>
              <Icon name="sparkle" size={13} /> Ask Sterling
            </button>
          </>
        }
      />
      <div className="page-body">
        <div className="bento">
          <div className="tile inverse" style={{ gridRow: 'span 2', justifyContent: 'space-between' }}>
            <div>
              <h3>
                <span style={{ background: 'var(--accent)', width: 6, height: 6, display: 'inline-block' }} />
                Today · Priorities
              </h3>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {b.priorities.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 18, height: 18, border: '0.5px solid var(--bg)', flexShrink: 0, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="mono" style={{ fontSize: 9, opacity: 0.6 }}>{(i + 1).toString().padStart(2, '0')}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.3 }}>{p}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <Link href="/todo" className="btn" style={{ background: 'transparent', color: 'var(--bg)', borderColor: 'var(--bg)' }}>
                Plan day <Icon name="arrow" size={11} />
              </Link>
              <Link href="/todo" className="btn ghost" style={{ color: 'var(--bg)' }}>
                <Icon name="todo" size={13} /> Open todo
              </Link>
            </div>
          </div>

          <div className="tile">
            <h3><Icon name="folder" size={10} /> Saved · all-time</h3>
            <div className="big tnum">1,284</div>
            <div className="mono dim tnum" style={{ fontSize: 10.5 }}>+47 THIS WEEK · +184 THIS MONTH</div>
            <MiniSparkline />
          </div>

          <div className="tile accent">
            <h3 style={{ color: 'var(--ink)', opacity: 1 }}>↑ Memory · active</h3>
            <div className="big tnum">392</div>
            <div className="mono" style={{ fontSize: 10.5, opacity: 0.7 }}>ENTRIES · INDEXED · PRIVATE</div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5 }}>
              <Icon name="eye" size={11} /> Memory is on
              <Link href="/memory" style={{ marginLeft: 'auto', textDecoration: 'underline', color: 'inherit' }}>Manage</Link>
            </div>
          </div>

          <div className="tile" style={{ gridColumn: 'span 2' }}>
            <h3><Icon name="globe" size={10} /> Calendar · today</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 4 }}>
              {b.calendar.map((c, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '58px 1fr 80px', gap: 12, padding: '10px 0', borderTop: i ? '0.5px solid var(--line-soft)' : '0' }}>
                  <div className="mono tnum" style={{ fontSize: 12, color: 'var(--ink)' }}>{c.t}</div>
                  <div style={{ fontSize: 13 }}>{c.title}</div>
                  <div className="mono dim tnum" style={{ fontSize: 10.5, textAlign: 'right' }}>{c.dur}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tile">
            <h3><Icon name="ask" size={10} /> Inbox · highlights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 4 }}>
              {b.inbox.map((c, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '10px 0', borderTop: i ? '0.5px solid var(--line-soft)' : '0' }}>
                  <div className="mono dim" style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{c.who}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.35 }}>{c.txt}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tile" style={{ gridColumn: 'span 3' }}>
            <h3><Icon name="bolt" size={10} /> Proactive · for you</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              {[
                { kicker: 'TIDY',    body: 'You have 14 tabs in Research about agents. Want me to group them?',     cta: 'Tidy them', href: '/spaces' },
                { kicker: 'DEDUPE',  body: 'I found 3 near-duplicate PDFs about MCP. Keep the newest?',             cta: 'Review',    href: '/agent' },
                { kicker: 'RELATED', body: "This morning's note 'Personas' is related to your search v2 spec.",     cta: 'Link them', href: '/whiteboard' },
              ].map((p, i) => (
                <div key={i} style={{ border: '0.5px solid var(--line-soft)', padding: 14 }}>
                  <div className="mono dim uppercase tiny" style={{ marginBottom: 10 }}>· {p.kicker}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.3, marginBottom: 14 }}>{p.body}</div>
                  <Link href={p.href} className="btn" style={{ height: 24, textDecoration: 'none' }}>
                    {p.cta} <Icon name="arrow" size={10} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
