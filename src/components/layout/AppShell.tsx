'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AskPanel } from './AskPanel';
import { CommandPalette } from '../modals/CommandPalette';
import { UploadModal } from '../modals/UploadModal';

interface AppShellProps {
  children: React.ReactNode;
}

type Palette = 'lime' | 'cyan' | 'orange' | 'violet' | 'mono';
type Sidebar = 'expanded' | 'collapsed';
type Density = 'regular' | 'dense';
type PanelPos = 'right' | 'bottom';

export function AppShell({ children }: AppShellProps) {
  const [palette, setPalette] = useState<Palette>('lime');
  const [dark, setDark] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<Sidebar>('expanded');
  const [density, setDensity] = useState<Density>('regular');
  const [panelPos, setPanelPos] = useState<PanelPos>('right');
  const [askOpen, setAskOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Sync theme attrs to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme   = dark ? 'dark' : 'light';
    html.dataset.palette = palette;
    html.dataset.sidebar = sidebarMode;
    html.dataset.density = density;
    html.dataset.panel   = panelPos;
  }, [dark, palette, sidebarMode, density, panelPos]);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmdOpen(true); }
      if (meta && e.key.toLowerCase() === 'j') { e.preventDefault(); setAskOpen(o => !o); }
      if (meta && e.key.toLowerCase() === 'u') { e.preventDefault(); setUploadOpen(true); }
      if (meta && e.key === '.') { e.preventDefault(); setSidebarMode(s => s === 'expanded' ? 'collapsed' : 'expanded'); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className={`app-shell ${askOpen ? 'with-panel' : ''}`} data-panel={panelPos}>
        <Sidebar
          collapsed={sidebarMode === 'collapsed'}
          onBrandClick={() => router.push('/')}
          onUpload={() => setUploadOpen(true)}
          onAsk={() => setAskOpen(o => !o)}
        />
        <TopBar
          query={query}
          setQuery={setQuery}
          onCmd={() => setCmdOpen(true)}
          onUpload={() => setUploadOpen(true)}
          onAsk={() => setAskOpen(o => !o)}
          askOpen={askOpen}
        />
        <main className="main">{children}</main>
        {askOpen && <AskPanel onClose={() => setAskOpen(false)} />}
      </div>

      {cmdOpen && (
        <CommandPalette
          onClose={() => setCmdOpen(false)}
          onUpload={() => { setUploadOpen(true); setCmdOpen(false); }}
          onAsk={() => { setAskOpen(true); setCmdOpen(false); }}
        />
      )}
      {uploadOpen && (
        <UploadModal
          onClose={() => setUploadOpen(false)}
          onAfter={() => router.push('/library')}
        />
      )}

      {/* Tweaks panel — floating bottom-right */}
      <TweaksPanel
        palette={palette} setPalette={setPalette}
        dark={dark} setDark={setDark}
        sidebar={sidebarMode} setSidebar={setSidebarMode}
        density={density} setDensity={setDensity}
        panel={panelPos} setPanel={setPanelPos}
      />
    </>
  );
}

interface TweaksPanelProps {
  palette: Palette; setPalette: (v: Palette) => void;
  dark: boolean; setDark: (v: boolean) => void;
  sidebar: Sidebar; setSidebar: (v: Sidebar) => void;
  density: Density; setDensity: (v: Density) => void;
  panel: PanelPos; setPanel: (v: PanelPos) => void;
}

function TweaksPanel({ palette, setPalette, dark, setDark, sidebar, setSidebar, density, setDensity, panel, setPanel }: TweaksPanelProps) {
  const [open, setOpen] = useState(false);

  const PALETTES: { value: Palette; color: string; label: string }[] = [
    { value: 'lime',   color: '#F0FF31', label: 'Lime' },
    { value: 'cyan',   color: '#00E0FF', label: 'Cyan' },
    { value: 'orange', color: '#FF6A1F', label: 'Orange' },
    { value: 'violet', color: '#7A5AF8', label: 'Violet' },
    { value: 'mono',   color: '#0A0A0A', label: 'Mono' },
  ];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 16, right: 16, zIndex: 999,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
          padding: '6px 12px', background: 'var(--ink)', color: 'var(--bg)',
          border: 0, cursor: 'pointer', textTransform: 'uppercase',
        }}
      >
        ⌥ Tweaks
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 999,
      width: 260, background: 'rgba(250,249,247,0.92)',
      border: '0.5px solid rgba(0,0,0,0.15)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      backdropFilter: 'blur(20px)',
      padding: 16, display: 'flex', flexDirection: 'column', gap: 14,
      fontFamily: 'var(--font-mono)', fontSize: 11, color: '#29261b',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b style={{ fontSize: 12 }}>Tweaks</b>
        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 0, cursor: 'pointer', fontSize: 13, color: 'rgba(41,38,27,0.55)' }}>✕</button>
      </div>

      <div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(41,38,27,0.45)', marginBottom: 8 }}>Accent</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {PALETTES.map(p => (
            <button
              key={p.value}
              onClick={() => setPalette(p.value)}
              title={p.label}
              style={{
                width: 32, height: 32, background: p.color, border: 0, cursor: 'pointer',
                outline: palette === p.value ? '2px solid #0A0A0A' : '1.5px solid rgba(0,0,0,0.15)',
                outlineOffset: palette === p.value ? 2 : 0,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Dark mode</span>
        <ToggleSmall on={dark} onChange={setDark} />
      </div>

      <div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(41,38,27,0.45)', marginBottom: 6 }}>Sidebar</div>
        <SegControl value={sidebar} options={['expanded', 'collapsed']} onChange={v => setSidebar(v as Sidebar)} />
      </div>

      <div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(41,38,27,0.45)', marginBottom: 6 }}>Density</div>
        <SegControl value={density} options={['regular', 'dense']} onChange={v => setDensity(v as Density)} />
      </div>

      <div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(41,38,27,0.45)', marginBottom: 6 }}>Ask panel</div>
        <SegControl value={panel} options={['right', 'bottom']} onChange={v => setPanel(v as PanelPos)} />
      </div>

      <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.45)', lineHeight: 1.6 }}>
        ⌘K Command palette<br />
        ⌘J Toggle Ask<br />
        ⌘U Upload<br />
        ⌘. Toggle sidebar
      </div>
    </div>
  );
}

function ToggleSmall({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{ width: 32, height: 18, border: 0, borderRadius: 999, background: on ? '#34c759' : 'rgba(0,0,0,0.15)', position: 'relative', cursor: 'pointer', padding: 0 }}
    >
      <span style={{ position: 'absolute', top: 2, left: on ? 14 : 2, width: 14, height: 14, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.25)', transition: 'left .15s' }} />
    </button>
  );
}

function SegControl({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.06)', borderRadius: 8, padding: 2, gap: 0 }}>
      {options.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          style={{
            flex: 1, border: 0, borderRadius: 6, padding: '4px 8px',
            background: value === o ? 'rgba(255,255,255,0.9)' : 'transparent',
            fontFamily: 'var(--font-mono)', fontSize: 10.5, cursor: 'pointer',
            color: '#29261b', fontWeight: value === o ? 500 : 400,
            boxShadow: value === o ? '0 1px 2px rgba(0,0,0,0.12)' : 'none',
            transition: 'background .15s',
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
