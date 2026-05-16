'use client';

import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { SEED_SPACES } from '@/lib/seed-data';

export function ScreenSpaces() {
  const [active, setActive] = useState('research');
  const [tidied, setTidied] = useState(false);
  const space = SEED_SPACES.find(s => s.id === active)!;

  return (
    <div className="page" style={{ height: '100%' }}>
      <PageHeader
        kicker="Browser Workspace"
        title="Your tabs are"
        em="actually organized."
        sub="4 spaces · 23 pinned · 9 groups · Tidy Tabs ready when you cross 6 open."
        actions={
          <>
            <button className="btn ghost"><Icon name="settings" size={12} /> Traffic Control</button>
            <button className={`btn ${tidied ? '' : 'accent'}`} onClick={() => setTidied(t => !t)}>
              <Icon name="sparkle" size={12} /> {tidied ? 'Tidied' : 'Tidy Tabs · 14'}
            </button>
          </>
        }
      />
      <div style={{ borderBottom: '0.5px solid var(--line-soft)' }} />
      <div className="spaces-grid">
        <div className="spaces-side">
          <div className="mono dim uppercase tiny" style={{ padding: '4px 12px 10px' }}>Spaces</div>
          {SEED_SPACES.map(s => {
            const ct = s.pinned.length + s.groups.reduce((a, g) => a + g.tabs.length, 0);
            return (
              <div key={s.id} className={`space-pill ${active === s.id ? 'on' : ''}`} onClick={() => setActive(s.id)}>
                <div className="sw" style={{ background: s.color }} />
                <span>{s.name}</span>
                <span className="ct tnum">{ct}</span>
              </div>
            );
          })}

          <div className="mono dim uppercase tiny" style={{ padding: '18px 12px 10px' }}>Smart</div>
          <div className="space-pill"><Icon name="folder" size={12} /><span>Library</span><span className="ct tnum">1.2k</span></div>
          <div className="space-pill"><Icon name="whiteboard" size={12} /><span>Whiteboards</span><span className="ct tnum">7</span></div>
          <div className="space-pill"><Icon name="folder" size={12} /><span>Archived tabs</span><span className="ct tnum">208</span></div>

          <div style={{ flex: 1 }} />
          <div className="mono dim uppercase tiny" style={{ padding: '4px 12px' }}>Traffic Rules · 6 active</div>
          <div style={{ padding: '4px 12px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['github.com/*', 'Work'], ['splice.com/*', 'Music'], ['are.na/*', 'Research'], ['calendar.google.com', 'Life']].map(([d, s], i) => (
              <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-2)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{d}</span><span>→ {s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-list">
          {tidied && (
            <div className="tile accent" style={{ marginBottom: 4 }}>
              <h3 style={{ color: 'var(--ink)' }}><Icon name="sparkle" size={10} /> Sterling tidied 14 tabs into 3 groups</h3>
              <div className="mono" style={{ fontSize: 11 }}>Grouped by intent · today's session · undo any with cmd-z</div>
            </div>
          )}

          <div className="tab-section">
            <h4>
              Pinned · {space.name}
              <span style={{ color: 'var(--ink-4)', letterSpacing: 0 }}> · never auto-archive</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 6 }}>
              {space.pinned.map((t, i) => (
                <div key={i} className="tab-row pinned" style={{ background: 'var(--paper)', border: '0.5px solid var(--line-soft)' }}>
                  <div className="fav">{t.fav}</div>
                  <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    <div style={{ fontSize: 12 }}>{t.title}</div>
                  </div>
                  <Icon name="pin" size={11} color="var(--ink-2)" />
                </div>
              ))}
            </div>
          </div>

          {space.groups.map((g, gi) => (
            <div className="tab-group" key={gi}>
              <h5>
                <span style={{ width: 10, height: 10, background: g.color, display: 'inline-block', border: '0.5px solid var(--line)' }} />
                {g.name}
                <span className="ct mono">· {g.tabs.length}</span>
                <span style={{ flex: 1 }} />
                <span className="mono dim" style={{ fontSize: 10 }}>cmd-G</span>
              </h5>
              {g.tabs.map((t, ti) => (
                <div key={ti} className="tab-row">
                  <div className="fav">{t.fav}</div>
                  <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {t.title} <span className="u" style={{ marginLeft: 8 }}>{t.url}</span>
                  </div>
                  <Icon name="close" size={11} color="var(--ink-3)" />
                </div>
              ))}
            </div>
          ))}

          {space.archived.length > 0 && (
            <div>
              <h4 className="mono uppercase tiny dim" style={{ margin: '12px 0 6px', letterSpacing: '0.14em' }}>
                Archived · last 7 days
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {space.archived.map((t, i) => (
                  <div key={i} className="tab-row" style={{ opacity: 0.55 }}>
                    <div className="fav">{t.fav}</div>
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {t.title} <span className="u" style={{ marginLeft: 8 }}>{t.url}</span>
                    </div>
                    <span className="u">{t.archivedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
