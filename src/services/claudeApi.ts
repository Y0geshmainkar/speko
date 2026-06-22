import axios from 'axios';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function formatWithClaude(transcript: string): Promise<string> {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY as string;
  if (!apiKey) throw new Error('VITE_CLAUDE_API_KEY is not set');

  const { data } = await axios.post(
    CLAUDE_API_URL,
    {
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Convert this voice transcript into well-structured Markdown. Use headings, bullet points, and paragraphs appropriately. Return only the Markdown, no explanation.\n\nTranscript:\n${transcript}`,
        },
      ],
    },
    {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
    }
  );

  const block = data.content?.[0];
  if (block?.type === 'text') return block.text as string;
  throw new Error('Unexpected Claude response format');
}
