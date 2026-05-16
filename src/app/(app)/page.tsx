'use client';

import { ScreenDashboard } from '@/components/screens/Dashboard';
import { useState } from 'react';

export default function DashboardPage() {
  const [, setAskOpen] = useState(false);
  return <ScreenDashboard onAsk={() => setAskOpen(true)} />;
}
