import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const userId = (session.user as { id: string }).id;
  const item = await prisma.savedItem.findFirst({ where: { id, userId } });
  if (!item) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const item = await prisma.savedItem.updateMany({
    where: { id, userId },
    data: body,
  });
  return NextResponse.json({ updated: item.count });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await params;
  const userId = (session.user as { id: string }).id;
  await prisma.savedItem.deleteMany({ where: { id, userId } });
  return NextResponse.json({ ok: true });
}
