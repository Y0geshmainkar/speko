import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Note } from '@/types';
import type { RootState } from '@/app/store';

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      state.notes.unshift(action.payload);
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectNoteById = (id: string) => (state: RootState) =>
  state.notes.notes.find((n) => n.id === id);

export default notesSlice.reducer;
