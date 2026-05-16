'use client';

interface ToggleProps {
  on: boolean;
  onChange?: (on: boolean) => void;
}

export function Toggle({ on, onChange }: ToggleProps) {
  return (
    <div
      className="toggle-track"
      style={{ background: on ? 'var(--ink)' : 'var(--line-soft)', cursor: onChange ? 'pointer' : 'default' }}
      onClick={() => onChange?.(!on)}
    >
      <div
        className="toggle-thumb"
        style={{
          left: on ? 15 : 1,
          background: on ? 'var(--accent)' : 'var(--bg)',
        }}
      />
    </div>
  );
}
