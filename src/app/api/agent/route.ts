import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const tasks = await prisma.agentTask.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const task = await prisma.agentTask.create({
    data: {
      userId,
      title:    String(body.title),
      status:   'QUEUED',
      step:     'queued',
      progress: 0,
      log:      [],
    },
  });
  // Queue the task for background processing (BullMQ/Inngest hook here)
  return NextResponse.json({ task });
}
