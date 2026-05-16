import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getAIProvider } from '@/lib/ai';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;
  const { question } = await req.json();
  if (!question) return NextResponse.json({ error: 'question required' }, { status: 400 });

  // Persist user message
  await prisma.assistantMessage.create({ data: { userId, role: 'USER', content: question } });

  // Retrieve relevant items as context (lightweight; replace with vector search)
  const items = await prisma.savedItem.findMany({
    where: {
      userId,
      OR: [
        { title:       { contains: question, mode: 'insensitive' } },
        { description: { contains: question, mode: 'insensitive' } },
      ],
    },
    take: 10,
  });

  const ai = getAIProvider();
  const answer = await ai.chat([
    { role: 'system', content: 'You are Sterling Search assistant. Answer based on the user\'s saved library. Cite items when relevant.' },
    { role: 'user',   content: `${question}\n\nContext items:\n${items.map(i => `- ${i.title} (${i.source})`).join('\n')}` },
  ]).catch(() => `Found ${items.length} relevant items in your library.`);

  const citations = items.slice(0, 3).map(i => ({ id: i.id, label: i.title, tag: i.type }));

  await prisma.assistantMessage.create({
    data: { userId, role: 'ASSISTANT', content: answer, citations: JSON.parse(JSON.stringify(citations)) },
  });

  return NextResponse.json({ answer, citations });
}
