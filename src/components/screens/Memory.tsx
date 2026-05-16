'use client';

import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';
import { Toggle } from '../ui/Toggle';
import { SEED_MEMORIES } from '@/lib/seed-data';

const MEMORY_POLICIES = [
  ['Capture from saved items', true],
  ['Capture from connected apps', true],
  ['Summarize meeting notes', false],
  ['Index Gmail & Calendar', false],
  ['Allow memory in search', true],
] as [string, boolean][];

export function ScreenMemory() {
  const [memoryOn, setMemoryOn] = useState(true);
  const [policies, setPolicies] = useState(MEMORY_POLICIES.map(([l, v]) => ({ label: l, on: v })));

  return (
    <div className="page">
      <PageHeader
        kicker="Memory · private"
        title="What Sterling"
        em="remembers."
        sub={`${SEED_MEMORIES.length}+ entries · all editable · indexed on-device first`}
        actions={
          <>
            <button className="btn ghost"><Icon name="filter" size={12} /> Sources</button>
            <button className={`btn ${memoryOn ? 'primary' : ''}`} onClick={() => setMemoryOn(m => !m)}>
              <Icon name={memoryOn ? 'pause' : 'play'} size={12} /> {memoryOn ? 'Pause memory' : 'Resume'}
            </button>
            <button className="btn"><Icon name="plus" size={12} /> Add memory</button>
          </>
        }
      />
      <div className="page-body" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
        <div>
          <div className="mono uppercase tiny dim" style={{ marginBottom: 4 }}>· Recent · auto-captured & manual</div>
          {SEED_MEMORIES.map((m, i) => (
            <div key={i} className="mem-row">
              <div className="mem-when">{m.when}</div>
              <div className="mem-txt">
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.4 }}>{m.txt}</div>
              </div>
              <div className="mem-src">{m.src}</div>
              <button className="btn ghost" style={{ height: 20, padding: 0 }}>
                <Icon name="close" size={12} color="var(--ink-3)" />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="tile" style={{ minHeight: 0 }}>
            <h3>· Memory policy</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {policies.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: i < policies.length - 1 ? '0.5px solid var(--line-soft)' : 0 }}>
                  <span style={{ fontSize: 12 }}>{p.label}</span>
                  <Toggle
                    on={p.on}
                    onChange={v => setPolicies(prev => prev.map((pp, j) => j === i ? { ...pp, on: v } : pp))}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="tile inverse" style={{ minHeight: 0 }}>
            <h3>· You can always say</h3>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.35 }}>
              "Forget what I read about <em>X</em>." Memory respects forgetting.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button className="btn" style={{ background: 'transparent', color: 'var(--bg)', borderColor: 'var(--bg)' }}>Export all</button>
              <button className="btn" style={{ background: 'var(--signal)', color: '#fff', borderColor: 'var(--signal)' }}>Forget · pick</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
