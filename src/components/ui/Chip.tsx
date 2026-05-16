'use client';

import { Icon } from './Icon';

interface ChipProps {
  children: React.ReactNode;
  kind?: 'default' | 'bold' | 'solid' | 'accent';
  icon?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Chip({ children, kind = 'default', icon, style, onClick }: ChipProps) {
  const cls = ['chip', kind !== 'default' ? kind : ''].filter(Boolean).join(' ');
  return (
    <span className={cls} style={style} onClick={onClick}>
      {icon && <Icon name={icon} size={9} />}
      {children}
    </span>
  );
}
