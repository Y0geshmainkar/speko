import ReactMarkdown from 'react-markdown';
import styles from './MarkdownPreview.module.scss';

interface Props {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: Props) {
  if (!markdown.trim()) {
    return <div className={`${styles.preview} ${styles.empty}`}>No content to preview yet.</div>;
  }

  return (
    <div className={styles.preview}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
