'use client';

import { Icon } from '../ui/Icon';

interface Item {
  id: string;
  type: string;
  color?: string;
  source: string;
  title: string;
  tags: string[];
}

function ImageMock({ seed, dark }: { seed: string; dark: boolean }) {
  const h = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
  const rot = (h % 60) - 30;
  const dx = (h * 7) % 100 - 50;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: '160%', height: '50%',
        background: dark ? '#222' : 'linear-gradient(135deg, #DCDAD2 0%, #B8B6AE 100%)',
        transform: `translate(-50%, -50%) translateX(${dx}px) rotate(${rot}deg)`,
      }} />
      <div style={{ position: 'absolute', left: 18, top: 18, width: 24, height: 24, background: dark ? '#F0FF31' : '#0A0A0A' }} />
      <div style={{ position: 'absolute', right: 18, bottom: 18, width: 36, height: 6, background: dark ? '#fff' : '#0A0A0A' }} />
    </div>
  );
}

function WaveformMock({ seed }: { seed: string }) {
  const bars = 36;
  const h = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <svg viewBox="0 0 200 110" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {Array.from({ length: bars }).map((_, i) => {
        const v = Math.abs(Math.sin(i * 1.7 + h * 0.3)) * 0.6 + 0.2;
        const hh = v * 70 + 6;
        return <rect key={i} x={i * (200 / bars) + 2} y={55 - hh / 2} width={(200 / bars) - 2} height={hh} fill="#F0FF31" />;
      })}
    </svg>
  );
}

function PdfMock() {
  const lines = [60, 80, 70, 90, 50, 0, 75, 65, 85, 0, 60, 70];
  return (
    <div style={{ flex: 1, background: '#fff', border: '0.5px solid #DCDAD2', padding: '12px 10px', borderBottom: 0 }}>
      <div style={{ height: 6, background: '#0A0A0A', width: '60%', marginBottom: 6 }} />
      <div style={{ height: 3, background: '#0A0A0A', width: '30%', marginBottom: 10 }} />
      {lines.map((w, i) =>
        w === 0
          ? <div key={i} style={{ height: 6 }} />
          : <div key={i} style={{ height: 2, background: '#8A8A86', width: `${w}%`, marginBottom: 3 }} />
      )}
    </div>
  );
}

function NoteLines() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 16, right: 16, height: 32, display: 'flex', flexDirection: 'column', gap: 3, opacity: 0.4 }}>
      <div style={{ height: 1, background: '#0A0A0A', width: '95%' }} />
      <div style={{ height: 1, background: '#0A0A0A', width: '80%' }} />
      <div style={{ height: 1, background: '#0A0A0A', width: '60%' }} />
    </div>
  );
}

function LinkMock({ item }: { item: Item }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
        {item.source}
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>
        {item.title}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 18, height: 18, background: item.color || 'var(--ink)', border: '0.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: item.color === '#FFFFFF' ? 'var(--ink)' : '#fff', fontWeight: 700 }}>
          {(item.source[0] || '?').toUpperCase()}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>
          {item.tags.slice(0, 2).join(' · ')}
        </div>
      </div>
    </div>
  );
}

export function Thumb({ item }: { item: Item }) {
  const t = item.type;

  if (t === 'image' || t === 'screenshot') {
    return (
      <div className="thumb" style={{ background: item.color || '#EDEBE3' }}>
        <ImageMock seed={item.id} dark={item.color === '#0A0A0A' || item.color === '#111'} />
      </div>
    );
  }

  if (t === 'audio') {
    return (
      <div className="thumb" style={{ background: '#0A0A0A', color: '#F0FF31' }}>
        <WaveformMock seed={item.id} />
        <div style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#F0FF31', letterSpacing: '0.08em' }}>
          {item.tags[0]} · {item.tags[2] || item.tags[1]}
        </div>
      </div>
    );
  }

  if (t === 'video') {
    return (
      <div className="thumb" style={{ background: '#0A0A0A' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #2A2825 0%, #0A0A0A 70%)' }}>
          <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#F4F3EE', letterSpacing: '0.1em' }}>VIDEO</div>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="play" size={14} color="#0A0A0A" stroke={1.5} fill="#0A0A0A" />
          </div>
        </div>
      </div>
    );
  }

  if (t === 'pdf') {
    return (
      <div className="thumb" style={{ background: '#FFFFFF', display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: '18px 18px 0' }}>
        <PdfMock />
      </div>
    );
  }

  if (t === 'note') {
    return (
      <div className="thumb" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', padding: '16px 16px 0', overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: 8 }}>NOTE</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.25 }}>
          {item.title}
        </div>
        <NoteLines />
      </div>
    );
  }

  return (
    <div className="thumb" style={{ background: 'var(--paper)', display: 'flex', alignItems: 'flex-start', padding: '16px 18px' }}>
      <LinkMock item={item} />
    </div>
  );
}
