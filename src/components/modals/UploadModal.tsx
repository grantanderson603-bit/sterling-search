'use client';

import { useState, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { Chip } from '../ui/Chip';

interface UploadModalProps {
  onClose: () => void;
  onAfter?: () => void;
}

type Stage = 'pick' | 'analyzing' | 'done';

export function UploadModal({ onClose, onAfter }: UploadModalProps) {
  const [stage, setStage] = useState<Stage>('pick');
  const [urlMode, setUrlMode] = useState(false);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = () => {
    setStage('analyzing');
    setTimeout(() => setStage('done'), 2200);
  };

  const handleUrl = () => {
    if (!url.trim()) return;
    setStage('analyzing');
    setTimeout(() => setStage('done'), 2200);
  };

  const handleDone = () => {
    onAfter?.();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <h3>Save to Sterling</h3>
          <button className="btn ghost" onClick={onClose} style={{ height: 26 }}>
            <Icon name="close" size={11} />
          </button>
        </div>
        <div className="modal-body">
          {stage === 'pick' && (
            <>
              <div className="seg" style={{ width: '100%', marginBottom: 16 }}>
                <button className={!urlMode ? 'on' : ''} onClick={() => setUrlMode(false)} style={{ flex: 1 }}>
                  Drop a file
                </button>
                <button className={urlMode ? 'on' : ''} onClick={() => setUrlMode(true)} style={{ flex: 1 }}>
                  Save a link
                </button>
              </div>

              {!urlMode ? (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                    multiple
                    accept="*/*"
                  />
                  <div className="dropzone" onClick={() => fileInputRef.current?.click()}>
                    <b>Drop anything here</b>
                    files · screenshots · audio · PDFs · or paste with ⌘V
                  </div>
                </>
              ) : (
                <>
                  <input
                    style={{ width: '100%', height: 42, border: '0.5px solid var(--line)', padding: '0 14px', fontFamily: 'var(--font-mono)', outline: 'none', fontSize: 12 }}
                    placeholder="https://…"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleUrl(); }}
                    autoFocus
                  />
                  <button className="btn accent" style={{ marginTop: 14, width: '100%', height: 38 }} onClick={handleUrl}>
                    <Icon name="upload" /> Save & auto-organize
                  </button>
                </>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 18 }}>
                {[['⌘V', 'Paste'], ['⌘⇧S', 'Screenshot'], ['⌘B', 'Bookmark tab']].map(([k, l], i) => (
                  <div key={i} style={{ border: '0.5px solid var(--line-soft)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="tb-kbd" style={{ alignSelf: 'flex-start' }}>{k}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {stage === 'analyzing' && (
            <div style={{ padding: '30px 0', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <span className="pulse" style={{ width: 12, height: 12 }} />
              </div>
              <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>
                ANALYZING · extracting text · embedding
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.3 }}>
                Sterling is reading your content and picking a topic…
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18 }}>
                <Chip>Reading text</Chip>
                <Chip kind="bold">Topic: AI Browsers</Chip>
                <Chip kind="accent">Filing</Chip>
              </div>
            </div>
          )}

          {stage === 'done' && (
            <div style={{ padding: '30px 0', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={18} color="#fff" stroke={2} />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>
                Saved & filed under <em>AI Browsers</em>
              </div>
              <div className="mono dim" style={{ fontSize: 11, marginBottom: 24 }}>
                Tagged: browser · AI · agents · auto-organized
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                <button className="btn" onClick={handleDone}>
                  Open in Library
                </button>
                <button className="btn ghost" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
