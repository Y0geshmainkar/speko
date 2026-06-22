import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import RecorderPage from '@/features/recorder/RecorderPage';
import recorderReducer from '@/features/recorder/recorderSlice';
import notesReducer from '@/features/notes/notesSlice';

// Mock claudeApi to avoid import.meta.env in Jest
jest.mock('@/services/claudeApi', () => ({
  formatWithClaude: jest.fn(),
}));

// Mock Speech API as unsupported to keep test simple
beforeEach(() => {
  Object.defineProperty(window, 'SpeechRecognition', { writable: true, value: undefined });
  Object.defineProperty(window, 'webkitSpeechRecognition', { writable: true, value: undefined });
});

function renderWithStore() {
  const store = configureStore({
    reducer: { recorder: recorderReducer, notes: notesReducer },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <RecorderPage />
      </MemoryRouter>
    </Provider>
  );
}

describe('RecorderPage', () => {
  it('shows unsupported message when Speech API is absent', () => {
    renderWithStore();
    expect(screen.getByText(/speech recognition is not supported/i)).toBeInTheDocument();
  });
});

describe('RecorderPage (with Speech API)', () => {
  beforeEach(() => {
    const mockAbort = jest.fn();
    class MockSpeechRecognition {
      continuous = false; interimResults = false; lang = '';
      onresult = null; onerror = null; onend = null;
      start = jest.fn(); stop = jest.fn(); abort = mockAbort;
    }
    Object.defineProperty(window, 'SpeechRecognition', { writable: true, value: MockSpeechRecognition });
  });

  it('renders mic button', () => {
    renderWithStore();
    expect(screen.getByRole('button', { name: /start recording/i })).toBeInTheDocument();
  });

  it('renders transcript placeholder', () => {
    renderWithStore();
    expect(screen.getByText(/transcript will appear here/i)).toBeInTheDocument();
  });
});
