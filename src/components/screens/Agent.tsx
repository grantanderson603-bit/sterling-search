'use client';

import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { Chip } from '../ui/Chip';
import { SEED_TASKS } from '@/lib/seed-data';

export function ScreenAgent() {
  return (
    <div className="page">
      <PageHeader
        kicker="Agent · supervised"
        title="Sterling can do"
        em="that for you."
        sub="6 tasks · 2 running · 2 done today · agent always asks before destructive moves"
        actions={
          <>
            <button className="btn ghost"><Icon name="folder" size={12} /> Saved workflows</button>
            <button className="btn accent"><Icon name="plus" size={12} /> New task</button>
          </>
        }
      />
      <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 28 }}>
        <div>
          <div className="mono uppercase tiny dim" style={{ marginBottom: 6 }}>· Active queue</div>
          {SEED_TASKS.map((t, i) => (
            <div className={`agent-row ${t.state}`} key={i}>
              <div className="ttl">
                <div>{t.title}</div>
                <div className="step">· {t.step}</div>
              </div>
              <div className="pg"><i style={{ width: `${t.progress}%` }} /></div>
              <div className="mono tnum dim" style={{ fontSize: 10.5 }}>{t.progress}%</div>
              <div className="stat">{t.status}</div>
              <button className="btn ghost" style={{ padding: 0, height: 20 }}>
                <Icon name="close" size={12} color="var(--ink-3)" />
              </button>
            </div>
          ))}

          <div className="mono uppercase tiny dim" style={{ margin: '24px 0 8px' }}>
            · Live log · Find and dedupe my saved AI browser articles
          </div>
          <div style={{ background: 'var(--ink)', color: 'var(--bg)', padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7 }}>
            <div><span style={{ color: '#F0FF31' }}>[09:14:02]</span> queue: pulled 38 candidates from topic "ai-browsers"</div>
            <div><span style={{ color: '#F0FF31' }}>[09:14:03]</span> embeddings: cosine ≥ 0.91 → 6 pairs</div>
            <div><span style={{ color: '#F0FF31' }}>[09:14:05]</span> dedupe: comparing canonical urls, dates, hashes</div>
            <div><span style={{ color: '#F0FF31' }}>[09:14:08]</span> match: arc-vs-dia (2024-10-04) ≈ arc-vs-dia (2024-10-04 cached) → keep newest</div>
            <div><span style={{ color: '#F0FF31' }}>[09:14:09]</span> match: mcp-explainer (substack) ≈ mcp-explainer (rss reposted) → keep canonical</div>
            <div><span style={{ color: '#F0FF31' }}>[09:14:11]</span> <span style={{ color: '#FF6A1F' }}>PAUSE</span> 1 of 6 candidates is ambiguous — needs your call</div>
            <div style={{ color: '#F0FF31', marginTop: 8 }}>[09:14:12] awaiting confirmation ↓</div>
            <div style={{ background: '#F0FF31', color: '#0A0A0A', padding: '8px 10px', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600 }}>"Browser company — Dia announcement (Oct 4)"</div>
                <div style={{ opacity: 0.7, marginTop: 2 }}>vs · "Dia by The Browser Company (Oct 5, video transcript)"</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ background: 'var(--ink)', color: '#F0FF31', border: 0, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>Keep both</button>
                <button style={{ background: 'transparent', color: 'var(--ink)', border: '0.5px solid var(--ink)', padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>Merge</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="tile">
            <h3>· Tools the agent can use</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                ['Browser · headless Chromium', 'ready'],
                ['MCP servers · 3 connected',   'ready'],
                ['FAZM computer-use',            'configure'],
                ['Gmail · read-only',            'ready'],
                ['GitHub · read-only',           'ready'],
                ['Notion · read-write',          'needs-auth'],
              ].map(([t, s], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderTop: i ? '0.5px solid var(--line-soft)' : 0, fontSize: 12 }}>
                  <span>{t}</span>
                  <Chip kind={s === 'ready' ? 'default' : s === 'configure' ? 'bold' : 'accent'}>
                    {s.toUpperCase()}
                  </Chip>
                </div>
              ))}
            </div>
          </div>

          <div className="tile accent">
            <h3 style={{ color: 'var(--ink)' }}>· Confirmation policy</h3>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.35 }}>
              The agent always asks before deleting, sending, or paying.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button className="btn">Adjust</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
