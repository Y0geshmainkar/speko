import { formatToMarkdown } from '@/utils/markdownFormatter';

describe('formatToMarkdown', () => {
  it('returns empty string for empty input', () => {
    expect(formatToMarkdown('')).toBe('');
    expect(formatToMarkdown('   ')).toBe('');
  });

  it('makes the first sentence an H1', () => {
    const result = formatToMarkdown('Hello world.');
    expect(result).toContain('# Hello world');
  });

  it('makes question sentences H2', () => {
    const result = formatToMarkdown('Intro. What is the plan?');
    expect(result).toContain('## What is the plan?');
  });

  it('makes list-like sentences bullet points', () => {
    const result = formatToMarkdown('Title. First item here. Second item here.');
    expect(result).toContain('- First item here');
    expect(result).toContain('- Second item here');
  });

  it('makes regular sentences paragraphs', () => {
    const result = formatToMarkdown('Title. This is a regular sentence.');
    expect(result).toContain('\nThis is a regular sentence.');
  });
});
