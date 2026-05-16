import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const entries = await prisma.memoryEntry.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const entry = await prisma.memoryEntry.create({
    data: {
      userId,
      content: String(body.content),
      source:  String(body.source || 'manual'),
      tags:    body.tags || [],
    },
  });
  return NextResponse.json({ entry });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await prisma.memoryEntry.deleteMany({ where: { id, userId } });
  return NextResponse.json({ ok: true });
}
