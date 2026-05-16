import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.trim() || '';
  if (!q) return NextResponse.json({ items: [], topics: [] });

  // Persist query for analytics
  await prisma.searchQuery.create({ data: { userId, query: q, resultCount: 0 } }).catch(() => {});

  const items = await prisma.savedItem.findMany({
    where: {
      userId,
      OR: [
        { title:       { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { contentText: { contains: q, mode: 'insensitive' } },
        { tags:        { has: q } },
      ],
    },
    take: 50,
    orderBy: { savedAt: 'desc' },
  });

  const topics = await prisma.topic.findMany({
    where: {
      userId,
      OR: [
        { name:   { contains: q, mode: 'insensitive' } },
        { parent: { contains: q, mode: 'insensitive' } },
      ],
    },
  });

  return NextResponse.json({ items, topics });
}
