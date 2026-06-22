import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectNoteById, deleteNote } from '@/features/notes/notesSlice';
import MarkdownPreview from '@/features/preview/MarkdownPreview';
import { exportNote } from '@/utils/exportNote';
import styles from './NoteDetail.module.scss';

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const note = useAppSelector(selectNoteById(id ?? ''));

  if (!note) {
    return (
      <div className={styles.page}>
        <p className={styles.notFound}>Note not found. <Link to="/notes">Back to notes</Link></p>
      </div>
    );
  }

  function handleDelete() {
    if (!note) return;
    dispatch(deleteNote(note.id));
    navigate('/notes');
  }

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <Link to="/notes" className={styles.back}>← Notes</Link>
        <div className={styles.actions}>
          <button className={styles.btnExport} onClick={() => exportNote(note)}>Export .md</button>
          <button className={styles.btnDelete} onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className={styles.meta}>
        {new Date(note.createdAt).toLocaleDateString(undefined, {
          year: 'numeric', month: 'long', day: 'numeric',
        })}
        {' · '}{note.wordCount} words
      </div>

      <MarkdownPreview markdown={note.markdown} />
    </div>
  );
}
