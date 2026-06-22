import { Link } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectNotes } from '@/features/notes/notesSlice';
import styles from './NotesList.module.scss';

export default function NotesList() {
  const notes = useAppSelector(selectNotes);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Notes</h1>
        <Link to="/" className={styles.btnNew}>+ New</Link>
      </div>

      {notes.length === 0 ? (
        <div className={styles.empty}>
          <p>No notes yet.</p>
          <Link to="/">Record your first note →</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {notes.map((note) => (
            <Link key={note.id} to={`/notes/${note.id}`} className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.title}>{note.title}</div>
                <div className={styles.meta}>
                  {new Date(note.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                  {' · '}{note.wordCount} words
                </div>
              </div>
              <span aria-hidden>›</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
