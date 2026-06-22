const isQuestion = (s: string) => s.trim().endsWith('?');

const isListLike = (s: string) =>
  /^(first|second|third|next|then|also|finally|lastly|one|two|three|\d+[.)]\s)/i.test(s.trim());

export function formatToMarkdown(transcript: string): string {
  if (!transcript.trim()) return '';

  const sentences = transcript
    .replace(/([.?!])\s+/g, '$1\n')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return '';

  const [first, ...rest] = sentences;
  const lines: string[] = [`# ${first}`];

  for (const sentence of rest) {
    if (isQuestion(sentence)) {
      lines.push(`\n## ${sentence}`);
    } else if (isListLike(sentence)) {
      lines.push(`- ${sentence}`);
    } else {
      lines.push(`\n${sentence}`);
    }
  }

  return lines.join('\n');
}
