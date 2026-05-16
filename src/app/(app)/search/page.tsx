'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ScreenSearch } from '@/components/screens/Search';

function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get('q') || '';
  return <ScreenSearch query={query} onClose={() => router.push('/library')} />;
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
