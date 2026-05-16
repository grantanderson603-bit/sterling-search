import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sterling Search — second brain · search · browser',
  description: 'AI-powered universal file organizer, semantic search engine, and browser workspace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" data-palette="lime" data-sidebar="expanded" data-density="regular" data-panel="right">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
