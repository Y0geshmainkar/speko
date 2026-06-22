import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RecorderStatus } from '@/types';
import type { RootState } from '@/app/store';

interface RecorderState {
  transcript: string;
  interimTranscript: string;
  status: RecorderStatus;
  error: string | null;
}

const initialState: RecorderState = {
  transcript: '',
  interimTranscript: '',
  status: 'idle',
  error: null,
};

const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    setTranscript(state, action: PayloadAction<string>) {
      state.transcript = action.payload;
    },
    setInterimTranscript(state, action: PayloadAction<string>) {
      state.interimTranscript = action.payload;
    },
    setStatus(state, action: PayloadAction<RecorderStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      if (action.payload) state.status = 'error';
    },
    resetRecorder(state) {
      state.transcript = '';
      state.interimTranscript = '';
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setTranscript, setInterimTranscript, setStatus, setError, resetRecorder } =
  recorderSlice.actions;

export const selectRecorder = (state: RootState) => state.recorder;

export default recorderSlice.reducer;
