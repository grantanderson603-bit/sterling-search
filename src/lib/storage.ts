// File storage abstraction — S3-compatible or local filesystem
// Switch between providers via env vars

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export interface StorageProvider {
  upload(buffer: Buffer, filename: string, mimeType: string): Promise<{ key: string; url: string }>;
  delete(key: string): Promise<void>;
  getUrl(key: string): string;
}

function getStorage(): StorageProvider {
  if (process.env.STORAGE_ENDPOINT && process.env.STORAGE_ACCESS_KEY) {
    return new S3Provider();
  }
  return new LocalProvider();
}

class LocalProvider implements StorageProvider {
  private dir = join(process.cwd(), 'public', 'uploads');

  constructor() {
    if (!existsSync(this.dir)) mkdirSync(this.dir, { recursive: true });
  }

  async upload(buffer: Buffer, filename: string, _mimeType: string): Promise<{ key: string; url: string }> {
    const ext = filename.split('.').pop() || 'bin';
    const key = `${randomUUID()}.${ext}`;
    const path = join(this.dir, key);
    await new Promise<void>((resolve, reject) => {
      const ws = createWriteStream(path);
      ws.write(buffer);
      ws.end();
      ws.on('finish', resolve);
      ws.on('error', reject);
    });
    return { key, url: `/uploads/${key}` };
  }

  async delete(key: string): Promise<void> {
    const { unlink } = await import('fs/promises');
    await unlink(join(this.dir, key)).catch(() => {});
  }

  getUrl(key: string): string {
    return `/uploads/${key}`;
  }
}

class S3Provider implements StorageProvider {
  private endpoint = process.env.STORAGE_ENDPOINT!;
  private bucket   = process.env.STORAGE_BUCKET!;
  private accessKey = process.env.STORAGE_ACCESS_KEY!;
  private secretKey = process.env.STORAGE_SECRET_KEY!;

  async upload(buffer: Buffer, filename: string, mimeType: string): Promise<{ key: string; url: string }> {
    const ext = filename.split('.').pop() || 'bin';
    const key = `uploads/${randomUUID()}.${ext}`;
    // S3-compatible PUT — wire up AWS SDK or fetch for production
    console.log('S3 upload placeholder — configure STORAGE_* env vars for real storage');
    return { key, url: `${this.endpoint}/${this.bucket}/${key}` };
  }

  async delete(key: string): Promise<void> {
    console.log('S3 delete placeholder', key);
  }

  getUrl(key: string): string {
    return `${this.endpoint}/${this.bucket}/${key}`;
  }
}

export const storage = getStorage();
