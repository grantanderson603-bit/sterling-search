'use client';

import { PageHeader } from '../ui/PageHeader';
import { Toggle } from '../ui/Toggle';

const INTEGRATIONS = [
  { name: 'Gmail',        s: 'Connected',    m: 'Read-only · 12.4k indexed',  on: true },
  { name: 'Google Drive', s: 'Connected',    m: 'Watching 3 folders',         on: true },
  { name: 'Notion',       s: 'Connected',    m: 'Read-write · 184 pages',     on: true },
  { name: 'Slack',        s: 'Not connected',m: 'Index DMs & threads',        on: false },
  { name: 'GitHub',       s: 'Connected',    m: 'Read-only · 14 repos',       on: true },
  { name: 'Calendar',     s: 'Not indexed',  m: 'Read-only · privacy default',on: false },
  { name: 'Dropbox',      s: 'Not connected',m: 'Mirror files into Library',  on: false },
  { name: 'Browser ext',  s: 'Available',    m: 'Chrome · Safari · Arc',      on: false },
  { name: 'iOS share',    s: 'Available',    m: 'TestFlight',                 on: false },
];

export function ScreenSettings() {
  return (
    <div className="page">
      <PageHeader
        kicker="Settings & Integrations"
        title="Wire up your"
        em="other apps."
        sub="6 integrations available · 3 connected · you control what gets indexed"
      />
      <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {INTEGRATIONS.map((it, i) => (
          <div key={i} className="tile" style={{ minHeight: 130 }}>
            <h3>· {it.name}</h3>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.2 }}>{it.s}</div>
            <div className="mono dim" style={{ fontSize: 10.5 }}>{it.m}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto', alignItems: 'center' }}>
              <button className="btn" style={{ height: 24, padding: '0 10px' }}>
                {it.on ? 'Manage' : 'Connect'}
              </button>
              {it.on && <Toggle on={true} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
