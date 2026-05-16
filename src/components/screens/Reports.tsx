'use client';

import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { Chip } from '../ui/Chip';

const REPORTS = [
  { ttl: 'AI Browsers · Q1 → Q2 landscape',          sub: '38 saves · 6 articles · 2 PDFs · 4 videos', topic: 'AI Browsers',    when: 'today' },
  { ttl: 'Memory v2 — internal RFC',                  sub: '12 saves · 4 notes · 1 whiteboard',          topic: 'Product Specs',  when: '2d' },
  { ttl: 'Guitar samples · what\'s in your library',  sub: '41 saves · 0 notes · grouped by BPM',        topic: 'Guitar Samples', when: '1w' },
];

const TODOS = [
  { d: false, t: 'Reply to D. about PM interview availability',          src: 'Gmail · 2h' },
  { d: false, t: 'Re-review PR #482 (vector embeddings into capture)',    src: 'GitHub · 4h' },
  { d: true,  t: 'Send memory v2 RFC to E. before standup',             src: 'you · note' },
  { d: false, t: 'Order Diatype license for the Sterling site',           src: 'Stripe Atlas · 1d' },
  { d: false, t: 'Try the 4 unreviewed guitar loops in Inbox',           src: 'Sterling · auto' },
];

export function ScreenReports() {
  const [todos, setTodos] = useState(TODOS);

  return (
    <div className="page">
      <PageHeader
        kicker="Reports"
        title="Made from what you've"
        em="already saved."
        sub="3 reports this month · pulled from links, PDFs, notes & connected apps"
        actions={<button className="btn accent"><Icon name="sparkle" size={12} /> Generate report</button>}
      />
      <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28 }}>
        <div>
          <div className="lib-list">
            <div className="lib-list-h">
              <div /><div>Title</div><div>Sources</div><div>Topic</div>
              <div style={{ textAlign: 'right' }}>Made</div><div />
            </div>
            {REPORTS.map((r, i) => (
              <div className="lib-row" key={i}>
                <div className="row-type">RPT</div>
                <div className="row-ttl">
                  <b>{r.ttl}</b>
                  <div className="row-sub">{r.sub}</div>
                </div>
                <div className="row-tags"><Chip kind="bold">Markdown</Chip><Chip>PDF</Chip></div>
                <div className="mono" style={{ fontSize: 10.5 }}>{r.topic}</div>
                <div className="mono dim tnum" style={{ fontSize: 10.5, textAlign: 'right' }}>{r.when} ago</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Icon name="arrow" size={12} color="var(--ink-3)" />
                </div>
              </div>
            ))}
          </div>

          <div className="mono uppercase tiny dim" style={{ margin: '28px 0 8px' }}>· Today's to-dos · pulled from your saves</div>
          <div style={{ background: 'var(--paper)', border: '0.5px solid var(--line-soft)' }}>
            {todos.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 140px', gap: 14, padding: '12px 14px', borderTop: i ? '0.5px solid var(--line-soft)' : 0, alignItems: 'center' }}>
                <div
                  style={{ width: 18, height: 18, border: '0.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.d ? 'var(--ink)' : 'transparent', cursor: 'pointer' }}
                  onClick={() => setTodos(prev => prev.map((tt, j) => j === i ? { ...tt, d: !tt.d } : tt))}
                >
                  {t.d && <Icon name="check" size={11} color="var(--accent)" />}
                </div>
                <div style={{ fontSize: 13, textDecoration: t.d ? 'line-through' : 'none', color: t.d ? 'var(--ink-3)' : 'var(--ink)' }}>
                  {t.t}
                </div>
                <div className="mono dim" style={{ fontSize: 10.5, textAlign: 'right' }}>{t.src}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="tile inverse" style={{ minHeight: 0 }}>
            <h3>· Report preview</h3>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.2, marginTop: 4 }}>
              AI Browsers · Q1 → Q2 landscape
            </div>
            <div className="mono" style={{ fontSize: 10.5, opacity: 0.6 }}>38 sources · generated 14:02 today</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.45, marginTop: 8, opacity: 0.9 }}>
              "Three meaningful directions emerged this quarter. Arc is committing to a workspace-first model. Dia bets that intent replaces URL entry. Comet positions itself as agent-native from the first paint…"
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button className="btn" style={{ background: 'transparent', color: 'var(--bg)', borderColor: 'var(--bg)' }}>Open full</button>
              <button className="btn" style={{ background: 'var(--accent)', color: 'var(--ink)', borderColor: 'var(--accent)' }}>Export PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
