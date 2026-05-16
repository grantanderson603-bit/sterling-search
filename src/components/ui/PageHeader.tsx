'use client';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  em?: string;
  sub?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ kicker, title, em, sub, actions }: PageHeaderProps) {
  return (
    <div className="page-hd">
      <div>
        {kicker && (
          <div className="mono uppercase tiny dim" style={{ marginBottom: 10 }}>
            {kicker}
          </div>
        )}
        <h1>
          {title} {em && <em>{em}</em>}
        </h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}
