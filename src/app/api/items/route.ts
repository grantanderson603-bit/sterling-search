import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CreateItemSchema = z.object({
  title:       z.string().min(1),
  description: z.string().optional(),
  type:        z.enum(['LINK', 'PDF', 'IMAGE', 'VIDEO', 'AUDIO', 'NOTE', 'SCREENSHOT', 'DOWNLOAD']),
  source:      z.string().default('manual'),
  url:         z.string().optional(),
  contentText: z.string().optional(),
  fileKey:     z.string().optional(),
  fileSize:    z.number().optional(),
  mimeType:    z.string().optional(),
  topics:      z.array(z.string()).default([]),
  tags:        z.array(z.string()).default([]),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  const topic = url.searchParams.get('topic');

  const userId = (session.user as { id: string }).id;
  const items = await prisma.savedItem.findMany({
    where: {
      userId,
      ...(type ? { type: type.toUpperCase() as never } : {}),
      ...(topic ? { topics: { has: topic } } : {}),
    },
    orderBy: { savedAt: 'desc' },
    take: 100,
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const parsed = CreateItemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const item = await prisma.savedItem.create({
    data: { ...parsed.data, userId, savedAt: new Date() },
  });
  return NextResponse.json({ item });
}
