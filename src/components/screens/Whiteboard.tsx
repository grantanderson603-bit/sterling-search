'use client';

import { Icon } from '../ui/Icon';
import { PageHeader } from '../ui/PageHeader';

export function ScreenWhiteboard() {
  return (
    <div className="page">
      <PageHeader
        kicker="Whiteboard · 03 of 07"
        title="Sterling"
        em="memory v2"
        sub="Last edited 18m ago · 14 items · 3 contributors (you)"
        actions={
          <>
            <button className="btn ghost"><Icon name="plus" size={12} /> Note</button>
            <button className="btn ghost"><Icon name="link" size={12} /> Link</button>
            <button className="btn ghost"><Icon name="image" size={12} /> Image</button>
            <button className="btn accent"><Icon name="sparkle" size={12} /> Summarize</button>
          </>
        }
      />
      <div className="page-body">
        <div className="wb-canvas">
          <div className="wb-note" style={{ top: 24, left: 32, transform: 'rotate(-1.2deg)' }}>
            <div className="h">Question · core</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.25 }}>
              Embed everything, or only what the user opens twice?
            </div>
          </div>

          <div className="wb-note note-2" style={{ top: 70, left: 280, width: 240, transform: 'rotate(0.8deg)' }}>
            <div className="h" style={{ color: 'var(--ink-2)' }}>Pieces OS take</div>
            <div style={{ fontSize: 12 }}>They embed everything; rely on relevance + recency as the surface.</div>
            <div className="mono dim tiny" style={{ marginTop: 8 }}>→ pieces.app · linked</div>
          </div>

          <div className="wb-note note-3" style={{ top: 240, left: 60, width: 220, transform: 'rotate(-0.5deg)' }}>
            <div className="h" style={{ opacity: 0.5 }}>My current bias</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.3 }}>
              Only embed second-touch items. First-touch stays in inbox.
            </div>
          </div>

          <div className="wb-note" style={{ top: 320, left: 360, width: 260, transform: 'rotate(1deg)' }}>
            <div className="h">Cost note</div>
            <div style={{ fontSize: 12.5 }}>
              Embedding every page = ~$8/user/month at current usage.
              Second-touch only = $1.20.
            </div>
          </div>

          <div className="wb-note note-2" style={{ top: 360, left: 720, width: 220, transform: 'rotate(-1deg)' }}>
            <div className="h">Privacy</div>
            <div style={{ fontSize: 12 }}>Reduces blast radius if the embeddings table leaks. Wins both ways.</div>
          </div>

          <div className="wb-img" style={{ top: 80, left: 660, width: 260, height: 160, padding: 14, background: 'var(--paper)' }}>
            <div className="mono dim tiny" style={{ marginBottom: 8 }}>SKETCH · IA · search v2</div>
            <svg viewBox="0 0 220 90" width="100%" height="80%">
              <rect x="10" y="10" width="50" height="20" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <rect x="80" y="10" width="50" height="20" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <rect x="150" y="10" width="50" height="20" stroke="#0A0A0A" strokeWidth="1" fill="none" />
              <line x1="35" y1="30" x2="35" y2="60" stroke="#0A0A0A" />
              <line x1="105" y1="30" x2="105" y2="60" stroke="#0A0A0A" />
              <line x1="175" y1="30" x2="175" y2="60" stroke="#0A0A0A" />
              <rect x="40" y="60" width="130" height="20" stroke="#0A0A0A" strokeWidth="1" fill="#F0FF31" />
            </svg>
          </div>

          <div className="wb-img" style={{ top: 260, left: 380, width: 280, height: 110, padding: 12, background: '#0A0A0A', color: '#F4F3EE' }}>
            <div className="mono tiny" style={{ marginBottom: 8, opacity: 0.6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>WEB CAPTURE · supabase</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.25 }}>
              "We picked pgvector because the embedding query happens next to the relational filter — one round trip instead of two."
            </div>
          </div>

          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="#0A0A0A" />
              </marker>
            </defs>
            <path d="M180 80 Q 240 60 290 90" stroke="#0A0A0A" strokeWidth="1" fill="none" markerEnd="url(#arr)" />
            <path d="M260 300 Q 360 320 390 320" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="3 3" fill="none" markerEnd="url(#arr)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
