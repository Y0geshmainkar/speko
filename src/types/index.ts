export interface Note {
  id: string;
  title: string;
  markdown: string;
  createdAt: string;
  wordCount: number;
}

export type RecorderStatus = 'idle' | 'listening' | 'stopped' | 'error';
