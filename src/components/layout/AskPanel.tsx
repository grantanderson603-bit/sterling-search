'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { SEED_ITEMS } from '@/lib/seed-data';
import type { AssistantMessage, Citation } from '@/types';

const SEED_THREAD: AssistantMessage[] = [
  {
    role: 'user',
    text: 'What guitar samples do I have around 96 BPM?',
  },
  {
    role: 'assistant',
    text: 'Three takes that match — all 96 BPM, E-minor adjacent.',
    cites: [
      { id: 'i04', label: 'GTR_clean_96bpm_E',    tag: 'WAV' },
      { id: 'i19', label: 'GTR_dirty_96bpm_Bb',   tag: 'WAV' },
      { id: 'i11', label: 'DRM_breakbeat_94bpm_dry', tag: 'WAV' },
    ],
    follow: 'Want me to compile them into a project folder, or surface what\'s missing (you\'re light on ambient at this BPM)?',
  },
];

const SUGGESTIONS = [
  'What did I save last week about AI browsers?',
  'Find every 96 BPM sample I have.',
  'Summarize my PDFs about second-brain apps.',
  'Pull every PR I haven\'t reviewed this week.',
];

function generateReply(q: string): AssistantMessage {
  const lower = q.toLowerCase();
  if (lower.includes('96') || lower.includes('guitar') || lower.includes('sample')) {
    return {
      role: 'assistant',
      text: 'Three takes that match — all 96 BPM, E-minor adjacent.',
      cites: [
        { id: 'i04', label: 'GTR_clean_96bpm_E',  tag: 'WAV' },
        { id: 'i19', label: 'GTR_dirty_96bpm_Bb', tag: 'WAV' },
      ],
      follow: 'Want me to compile them into a project folder?',
    };
  }
  if (lower.includes('yesterday') || lower.includes('last week') || lower.includes('today')) {
    return {
      role: 'assistant',
      text: 'You saved 47 items this week, mostly clustered around AI browsers and Sterling memory v2. 14 are still in Inbox.',
      cites: [
        { label: 'AI Browsers · 18', tag: 'TOPIC' },
        { label: 'Product Specs · 9', tag: 'TOPIC' },
        { label: 'Inbox · 14',        tag: 'BOX' },
      ],
      follow: 'Want a one-page report, or just the unread highlights?',
    };
  }
  if (lower.includes('pdf') || lower.includes('second brain') || lower.includes('summar')) {
    return {
      role: 'assistant',
      text: 'Across 8 PDFs about second-brain apps, one pattern dominates: relevance beats completeness. Mymind hides what you didn\'t open; Pieces embeds everything but ranks by recency; Obsidian leaves it to you.',
      cites: [
        { label: 'Memex revisited',             tag: 'PDF' },
        { label: 'Why second-brains fail at recall', tag: 'LINK' },
        { label: 'Pieces OS — LTM',             tag: 'LINK' },
      ],
      follow: 'Should I draft a one-pager for your memory v2 RFC using these?',
    };
  }
  if (lower.includes('pr') || lower.includes('review') || lower.includes('github')) {
    return {
      role: 'assistant',
      text: '3 PRs need your eyes this week. The oldest is #479 (brutalist mono on Library, 5d).',
      cites: [
        { label: '#482 wire embeddings into capture', tag: 'PR' },
        { label: '#481 collapse memory & saved schema', tag: 'PR' },
        { label: '#479 brutalist mono on Library', tag: 'PR' },
      ],
      follow: 'Want me to open them all in Work · Spaces?',
    };
  }
  return {
    role: 'assistant',
    text: 'I searched your library, memory, and the open spaces — nothing exact. The closest matches are below.',
    cites: SEED_ITEMS.slice(0, 3).map(it => ({ label: it.title, tag: it.type.toUpperCase().slice(0, 3) })),
    follow: 'Want me to search the web as well?',
  };
}

function AskMessage({ m }: { m: AssistantMessage }) {
  if (m.role === 'user') {
    return (
      <div>
        <div className="mono uppercase tiny dim" style={{ marginBottom: 6 }}>· You</div>
        <div className="ask-msg you">{m.text}</div>
      </div>
    );
  }
  return (
    <div>
      <div className="mono uppercase tiny dim" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="sparkle" size={9} /> STERLING · 0.8s · 14 items searched
      </div>
      <div className="ask-msg bot">{m.text}</div>
      {m.cites && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {m.cites.map((c, i) => (
            <span key={i} className="ask-cite">
              <span className="mono dim" style={{ fontSize: 9 }}>{c.tag}</span>
              <b>{c.label}</b>
            </span>
          ))}
        </div>
      )}
      {m.follow && (
        <div style={{ marginTop: 10, padding: 10, background: 'var(--paper)', border: '0.5px solid var(--line-soft)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)' }}>
          · {m.follow}
        </div>
      )}
    </div>
  );
}

export function AskPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<AssistantMessage[]>(SEED_THREAD);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  };

  useEffect(scrollDown, [msgs]);

  const send = (txt: string) => {
    if (!txt.trim()) return;
    setInput('');
    setMsgs(prev => [...prev, { role: 'user', text: txt }]);
    setStreaming(true);
    setTimeout(() => {
      setMsgs(prev => [...prev, generateReply(txt)]);
      setStreaming(false);
    }, 900);
  };

  return (
    <aside className="ask panel">
      <div className="ask-hd">
        <Icon name="sparkle" size={14} />
        <b>Ask Sterling</b>
        <span className="mono dim" style={{ fontSize: 10, marginLeft: 6 }}>· cites your library</span>
        <div style={{ flex: 1 }} />
        <button className="btn ghost" style={{ height: 24, padding: '0 8px' }} onClick={onClose}>
          <Icon name="close" size={11} />
        </button>
      </div>
      <div className="ask-body" ref={bodyRef}>
        {msgs.map((m, i) => <AskMessage key={i} m={m} />)}
        {streaming && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-2)' }}>
            <span className="pulse" style={{ width: 6, height: 6 }} />
            Searching memory + library<span className="dots" style={{ display: 'inline-block', width: 18 }} />
          </div>
        )}
      </div>
      <div className="ask-suggests">
        {SUGGESTIONS.map((s, i) => (
          <button key={i} className="ask-suggest" onClick={() => send(s)}>· {s}</button>
        ))}
      </div>
      <div className="ask-input">
        <input
          placeholder="Ask anything — search, summarize, do…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(input); }}
          autoFocus
        />
        <button className="ask-send" onClick={() => send(input)}>Send →</button>
      </div>
    </aside>
  );
}
