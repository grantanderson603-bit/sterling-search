import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { storage } from '@/lib/storage';
import { classifyItem } from '@/lib/ai';
import { createHash } from 'crypto';

function mimeToType(mime: string): 'LINK' | 'PDF' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'NOTE' | 'SCREENSHOT' | 'DOWNLOAD' {
  if (mime.startsWith('image/')) return 'IMAGE';
  if (mime.startsWith('video/')) return 'VIDEO';
  if (mime.startsWith('audio/')) return 'AUDIO';
  if (mime === 'application/pdf') return 'PDF';
  if (mime === 'text/plain' || mime === 'text/markdown') return 'NOTE';
  return 'DOWNLOAD';
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const url  = formData.get('url')  as string | null;

  if (url) {
    // URL-based capture — async AI classify will fill metadata later
    const item = await prisma.savedItem.create({
      data: {
        userId,
        title:       url,
        description: '',
        type:        'LINK',
        source:      new URL(url).hostname,
        url,
        topics:      [],
        tags:        [],
        savedAt:     new Date(),
      },
    });

    // Fire-and-forget classification
    classifyItem(url, '', new URL(url).hostname).then(async ({ topic, tags, summary }) => {
      await prisma.savedItem.update({
        where: { id: item.id },
        data:  { description: summary, tags },
      }).catch(() => {});
    }).catch(() => {});

    return NextResponse.json({ item });
  }

  if (!file) return NextResponse.json({ error: 'file or url required' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const hash = createHash('sha256').update(buffer).digest('hex');

  // Dedupe by hash
  const existing = await prisma.savedItem.findFirst({ where: { userId, hash } });
  if (existing) return NextResponse.json({ item: existing, duplicate: true });

  const { key } = await storage.upload(buffer, file.name, file.type);

  const item = await prisma.savedItem.create({
    data: {
      userId,
      title:    file.name,
      type:     mimeToType(file.type),
      source:   'upload',
      mimeType: file.type,
      fileKey:  key,
      fileSize: file.size,
      hash,
      topics:   [],
      tags:     [],
      savedAt:  new Date(),
    },
  });

  return NextResponse.json({ item });
}
