import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setTranscript, setInterimTranscript, setStatus, setError, resetRecorder, selectRecorder } from './recorderSlice';
import { addNote } from '@/features/notes/notesSlice';
import { formatToMarkdown } from '@/utils/markdownFormatter';
import { formatWithClaude } from '@/services/claudeApi';
import MarkdownPreview from '@/features/preview/MarkdownPreview';
import styles from './RecorderPage.module.scss';
import type { Note } from '@/types';

export default function RecorderPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, transcript, interimTranscript, error } = useAppSelector(selectRecorder);
  const speech = useSpeechRecognition();
  const [showPreview, setShowPreview] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [aiMarkdown, setAiMarkdown] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => { dispatch(setTranscript(speech.transcript)); }, [speech.transcript, dispatch]);
  useEffect(() => { dispatch(setInterimTranscript(speech.interimTranscript)); }, [speech.interimTranscript, dispatch]);
  useEffect(() => { if (speech.error) dispatch(setError(speech.error)); }, [speech.error, dispatch]);
  useEffect(() => {
    if (speech.isListening) dispatch(setStatus('listening'));
    else if (status === 'listening') dispatch(setStatus('stopped'));
  }, [speech.isListening, dispatch, status]);

  if (!speech.isSupported) {
    return (
      <div className={styles.page}>
        <p className={styles.unsupported}>⚠️ Speech recognition is not supported. Try Chrome or Edge.</p>
      </div>
    );
  }

  const isListening = status === 'listening';
  const autoMarkdown = formatToMarkdown(transcript);
  const markdown = useAI && aiMarkdown ? aiMarkdown : autoMarkdown;
  const hasTranscript = transcript.trim().length > 0;

  async function handleAIFormat() {
    setAiLoading(true);
    setAiError(null);
    try {
      const result = await formatWithClaude(transcript);
      setAiMarkdown(result);
      setUseAI(true);
      setShowPreview(true);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'AI formatting failed');
    } finally {
      setAiLoading(false);
    }
  }

  function handleSave() {
    const words = transcript.trim().split(/\s+/);
    const note: Note = {
      id: crypto.randomUUID(),
      title: transcript.split(/[.?!]/)[0].trim() || 'Untitled',
      markdown,
      createdAt: new Date().toISOString(),
      wordCount: words.filter(Boolean).length,
    };
    dispatch(addNote(note));
    dispatch(resetRecorder());
    setAiMarkdown('');
    setUseAI(false);
    navigate('/notes');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Speako</h1>
        <p>Speak your thoughts. We'll turn them into notes.</p>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.micBtn} ${isListening ? styles.listening : ''}`}
          onClick={isListening ? speech.stop : speech.start}
          aria-label={isListening ? 'Stop recording' : 'Start recording'}
          aria-pressed={isListening}
        >
          {isListening ? '⏹' : '🎙'}
        </button>

        <span
          className={`${styles.status} ${isListening ? styles.active : ''}`}
          role="status"
          aria-live="polite"
        >
          {isListening ? '● Recording…' : status === 'stopped' ? 'Stopped' : 'Ready'}
        </span>
      </div>

      {error && <p className={styles.error}>Error: {error}</p>}

      <div className={styles.transcriptBox} aria-label="Transcript">
        {transcript || interimTranscript ? (
          <>
            <span>{transcript}</span>
            {interimTranscript && <span className={styles.interim}> {interimTranscript}</span>}
          </>
        ) : (
          <span className={styles.placeholder}>Your transcript will appear here…</span>
        )}
      </div>

      {hasTranscript && (
        <>
          <div className={styles.formatToggle}>
            <button
              className={`${styles.toggleBtn} ${!useAI ? styles.toggleActive : ''}`}
              onClick={() => setUseAI(false)}
            >Auto Format</button>
            <button
              className={`${styles.toggleBtn} ${useAI ? styles.toggleActive : ''}`}
              onClick={handleAIFormat}
              disabled={aiLoading}
            >{aiLoading ? 'Formatting…' : 'AI Format'}</button>
          </div>

          {aiError && <p className={styles.error}>{aiError}</p>}

          <div className={styles.actions}>
            <button className={styles.btnSecondary} onClick={() => setShowPreview((p) => !p)}>
              {showPreview ? 'Hide Preview' : 'Preview'}
            </button>
            <button className={styles.btnPrimary} onClick={handleSave}>Save Note</button>
          </div>
        </>
      )}

      {showPreview && hasTranscript && <MarkdownPreview markdown={markdown} />}
    </div>
  );
}
