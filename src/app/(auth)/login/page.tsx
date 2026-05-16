'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

export default function LoginPage() {
  const [email, setEmail] = useState('will@sterling.app');
  const [password, setPassword] = useState('sterling123');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setErr('Invalid email or password.');
    else router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 420, background: 'var(--paper)', border: '0.5px solid var(--line-soft)' }}>
        <div style={{ padding: '24px 28px', borderBottom: '0.5px solid var(--line-soft)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="sb-mark">S</div>
          <div>
            <div className="mono uppercase tiny dim">STERLING SEARCH</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>Sign in to continue.</div>
          </div>
        </div>
        <form onSubmit={submit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="mono uppercase tiny dim">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ height: 38, padding: '0 12px', border: '0.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-mono)', fontSize: 12, outline: 'none' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="mono uppercase tiny dim">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ height: 38, padding: '0 12px', border: '0.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'var(--font-mono)', fontSize: 12, outline: 'none' }}
            />
          </label>
          {err && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--signal)' }}>
              {err}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn accent" style={{ height: 40, justifyContent: 'center' }}>
            <Icon name="sparkle" size={12} /> {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <div className="mono dim" style={{ fontSize: 10.5, textAlign: 'center', marginTop: 6 }}>
            Demo: will@sterling.app · sterling123
          </div>
        </form>
      </div>
    </div>
  );
}
