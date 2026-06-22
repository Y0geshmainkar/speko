import notesReducer, { addNote, deleteNote } from '@/features/notes/notesSlice';
import type { Note } from '@/types';

const mockNote: Note = {
  id: '1',
  title: 'Test Note',
  markdown: '# Test Note',
  createdAt: new Date().toISOString(),
  wordCount: 2,
};

describe('notesSlice', () => {
  it('starts with empty notes', () => {
    const state = notesReducer(undefined, { type: '@@INIT' });
    expect(state.notes).toEqual([]);
  });

  it('addNote prepends a note', () => {
    const state = notesReducer(undefined, addNote(mockNote));
    expect(state.notes).toHaveLength(1);
    expect(state.notes[0].id).toBe('1');
  });

  it('addNote prepends — newest first', () => {
    const note2: Note = { ...mockNote, id: '2', title: 'Second' };
    let state = notesReducer(undefined, addNote(mockNote));
    state = notesReducer(state, addNote(note2));
    expect(state.notes[0].id).toBe('2');
  });

  it('deleteNote removes by id', () => {
    let state = notesReducer(undefined, addNote(mockNote));
    state = notesReducer(state, deleteNote('1'));
    expect(state.notes).toHaveLength(0);
  });

  it('deleteNote ignores unknown id', () => {
    let state = notesReducer(undefined, addNote(mockNote));
    state = notesReducer(state, deleteNote('999'));
    expect(state.notes).toHaveLength(1);
  });
});
