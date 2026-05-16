// AI provider abstraction — plug in any LLM/embedding provider
// Currently uses OpenAI-compatible interface with Anthropic fallback

export interface AIProvider {
  chat(messages: { role: string; content: string }[]): Promise<string>;
  embed(text: string): Promise<number[]>;
}

// Provider factory — selects based on available env vars
export function getAIProvider(): AIProvider {
  if (process.env.OPENAI_API_KEY) return new OpenAIProvider();
  if (process.env.ANTHROPIC_API_KEY) return new AnthropicProvider();
  return new MockProvider();
}

class OpenAIProvider implements AIProvider {
  async chat(messages: { role: string; content: string }[]): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 1024 }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  async embed(text: string): Promise<number[]> {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'text-embedding-3-small', input: text }),
    });
    const data = await res.json();
    return data.data?.[0]?.embedding || [];
  }
}

class AnthropicProvider implements AIProvider {
  async chat(messages: { role: string; content: string }[]): Promise<string> {
    const system = messages.find(m => m.role === 'system')?.content || '';
    const userMsgs = messages.filter(m => m.role !== 'system');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: system || undefined,
        messages: userMsgs,
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  async embed(_text: string): Promise<number[]> {
    // Anthropic doesn't have embeddings yet — fall back to zeros or use OpenAI for this
    console.warn('Anthropic does not support embeddings. Using mock.');
    return new Array(1536).fill(0);
  }
}

class MockProvider implements AIProvider {
  async chat(messages: { role: string; content: string }[]): Promise<string> {
    const last = messages[messages.length - 1]?.content || '';
    if (last.toLowerCase().includes('topic')) return 'AI Browsers';
    if (last.toLowerCase().includes('summar')) return 'A thoughtful summary of the saved content.';
    return 'I found 3 relevant items in your library.';
  }

  async embed(_text: string): Promise<number[]> {
    return new Array(1536).fill(0).map(() => Math.random() - 0.5);
  }
}

// Classify a saved item into a topic using AI
export async function classifyItem(title: string, content: string, source: string): Promise<{ topic: string; tags: string[]; summary: string }> {
  const ai = getAIProvider();
  try {
    const response = await ai.chat([{
      role: 'system',
      content: 'You are a content classifier. Given a title, source, and content snippet, output JSON with: topic (single string), tags (array of 3-5 strings), summary (1-2 sentence description). Be concise.',
    }, {
      role: 'user',
      content: `Title: ${title}\nSource: ${source}\nContent: ${content.slice(0, 500)}`,
    }]);
    return JSON.parse(response);
  } catch {
    return { topic: 'Uncategorized', tags: [], summary: '' };
  }
}
