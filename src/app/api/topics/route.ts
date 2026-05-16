import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const topics = await prisma.topic.findMany({ where: { userId }, orderBy: { count: 'desc' } });
  return NextResponse.json({ topics });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const topic = await prisma.topic.create({
    data: {
      userId,
      name:   String(body.name),
      parent: String(body.parent || 'Misc'),
      subs:   body.subs || [],
      count:  0,
    },
  });
  return NextResponse.json({ topic });
}
