'use client';

const ICONS: Record<string, string> = {
  inbox:      'M3 7l4 0 1 2h4l1-2 4 0M3 7v8a2 2 0 002 2h10a2 2 0 002-2V7M3 7l2-3h10l2 3',
  library:    'M4 4v12h12V4H4zM7 7v9M10 7v9M13 7v9',
  topics:     'M3 5h7M3 9h7M3 13h7M14 4v12M14 4l3 3M14 4l-3 3',
  type:       'M5 4h10M10 4v12M7 12h6',
  ask:        'M3 5a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H8l-4 3v-3a2 2 0 01-2-2V5z',
  search:     'M9 17a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  globe:      'M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM1.5 10h17M10 1.5C7.5 4 6 6.5 6 10s1.5 6 4 8.5M10 1.5c2.5 2.5 4 5 4 8.5s-1.5 6-4 8.5',
  spaces:     'M3 4h6v6H3zM11 4h6v6h-6zM3 12h6v6H3zM11 12h6v6h-6z',
  memory:     'M5 3v14M5 3l5 3 5-3M5 17l5-3 5 3M15 3v14',
  agent:      'M5 7a3 3 0 016 0v1H5V7zM3 10h14v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6zM8 13v2M12 13v2',
  whiteboard: 'M3 5h14v9H3zM5 17l5-3 5 3',
  reports:    'M4 17V7l4-4h8v14H4zM12 3v4h4',
  todo:       'M3 5l2 2 3-3M3 11l2 2 3-3M3 17l2 2 3-3M11 6h7M11 12h7M11 18h7',
  settings:   'M11.5 1.5h-3l-.6 2.4a7 7 0 00-1.7 1L4 4l-1.5 2.6 1.8 1.7a7 7 0 000 2L2.5 12 4 14.6l2.2-.9a7 7 0 001.7 1l.6 2.4h3l.6-2.4a7 7 0 001.7-1l2.2.9 1.5-2.6-1.8-1.7a7 7 0 000-2l1.8-1.7L16 4l-2.2.9a7 7 0 00-1.7-1l-.6-2.4zM10 13a3 3 0 100-6 3 3 0 000 6z',
  upload:     'M10 3v11M5 8l5-5 5 5M3 17h14',
  plus:       'M10 4v12M4 10h12',
  link:       'M9 13l2-2 4-4a3 3 0 014 4l-4 4-2 2M11 7L7 11l-2 2a3 3 0 004 4l4-4 2-2',
  doc:        'M5 3h7l4 4v10H5V3zM12 3v4h4',
  image:      'M3 4h14v12H3zM3 12l3-3 3 3 4-4 4 4M7 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  music:      'M7 17V5l9-2v12M7 17a2 2 0 11-2-2 2 2 0 012 2zM16 15a2 2 0 11-2-2 2 2 0 012 2z',
  video:      'M3 5h14v10H3zM8 7l5 3-5 3V7z',
  star:       'M10 2l2.5 5 5.5.8-4 4 1 5.6L10 14.8 4.9 17.4l1-5.6-4-4 5.5-.8L10 2z',
  arrow:      'M5 10h10M10 5l5 5-5 5',
  arrowL:     'M15 10H5M10 5l-5 5 5 5',
  close:      'M5 5l10 10M15 5L5 15',
  check:      'M4 10l4 4 8-8',
  filter:     'M3 5h14M5 10h10M8 15h4',
  grid:       'M3 3h7v7H3zM10 3h7v7h-7zM3 10h7v7H3zM10 10h7v7h-7z',
  list:       'M3 5h14M3 10h14M3 15h14',
  sparkle:    'M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2zM4 14l.7 1.8L6.5 16.5l-1.8.7L4 19l-.7-1.8L1.5 16.5l1.8-.7L4 14z',
  pin:        'M10 1.5l4 4-1.5 1.5-1 0L9 9.5l-3 .5-1.5 1.5 1.5 1.5 1 1L9 12l.5 4 1.5-1.5L11 12l3-2 1.5-1.5 1 1L18 8l-4-4-1.5 1.5z',
  pause:      'M6 4h2v12H6zM12 4h2v12h-2z',
  play:       'M5 3l12 7-12 7V3z',
  folder:     'M3 5a1 1 0 011-1h4l2 2h7a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V5z',
  bolt:       'M11 1l-7 11h5l-1 7 7-11h-5l1-7z',
  eye:        'M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6zM10 13a3 3 0 100-6 3 3 0 000 6z',
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  stroke?: number;
  fill?: string;
}

export function Icon({ name, size = 14, color = 'currentColor', stroke = 1.25, fill = 'none' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name] || ICONS.doc} />
    </svg>
  );
}
