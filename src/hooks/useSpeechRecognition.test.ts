import { renderHook, act } from '@testing-library/react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

// Mock the Web Speech API
const mockStart = jest.fn();
const mockStop = jest.fn();
const mockAbort = jest.fn();

class MockSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = '';
  onresult: ((e: Event) => void) | null = null;
  onerror: ((e: Event) => void) | null = null;
  onend: (() => void) | null = null;
  start = mockStart;
  stop = mockStop;
  abort = mockAbort;
}

beforeEach(() => {
  Object.defineProperty(window, 'SpeechRecognition', {
    writable: true,
    value: MockSpeechRecognition,
  });
  jest.clearAllMocks();
});

describe('useSpeechRecognition', () => {
  it('reports isSupported = true when API exists', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    expect(result.current.isSupported).toBe(true);
  });

  it('starts with isListening = false', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    expect(result.current.isListening).toBe(false);
  });

  it('sets isListening to true on start()', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => { result.current.start(); });
    expect(result.current.isListening).toBe(true);
    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  it('sets isListening to false on stop()', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    act(() => { result.current.start(); });
    act(() => { result.current.stop(); });
    expect(result.current.isListening).toBe(false);
    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  it('reports isSupported = false when API is absent', () => {
    Object.defineProperty(window, 'SpeechRecognition', { writable: true, value: undefined });
    Object.defineProperty(window, 'webkitSpeechRecognition', { writable: true, value: undefined });
    const { result } = renderHook(() => useSpeechRecognition());
    expect(result.current.isSupported).toBe(false);
  });
});
