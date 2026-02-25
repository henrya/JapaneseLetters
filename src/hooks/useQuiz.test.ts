import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useQuiz } from './useQuiz';

// Mock the shuffleArray to make tests deterministic
// It returns a reversed copy of the input array.
vi.mock('../utils/arrayUtils', () => ({
  shuffleArray: <T>(array: T[]): T[] => {
    return [...array].reverse();
  },
}));

describe('useQuiz', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with a hiragana quiz and set the first question', () => {
    const { result } = renderHook(() => useQuiz('hiragana'));

    // Based on the mock, the last item in hiragana.json ('ん', 'n') becomes the first.
    // The question is the kana ('ん'), the correct answer is the romaji ('n').
    expect(result.current.question).toBe('ん');
    expect(result.current.answers).toHaveLength(4);

    // The correct answer 'n' should be one of the options.
    const answerOptions = result.current.answers.map((ans) => ans[0]);
    expect(answerOptions).toContain('n');
  });

  it('should initialize with an N5 vocabulary quiz and set the first question', () => {
    const { result } = renderHook(() => useQuiz('n5'));

    // Based on the mock, the last item in n5.json becomes the first.
    // Question is english, answer is kana.
    expect(result.current.question).toBe('grandfather');
    const answerOptions = result.current.answers.map((ans) => ans[0]);
    expect(answerOptions).toContain('おじいさん');
  });

  it('should set `correct` to true for a correct answer and then reset', () => {
    const { result } = renderHook(() => useQuiz('hiragana'));

    // The correct answer is 'n'.
    act(() => {
      result.current.handleAnswerClick('n');
    });
    expect(result.current.correct).toBe(true);

    // The question should stay the same immediately after answering
    expect(result.current.question).toBe('ん');

    // Fast-forward past the 1-second timeout
    act(() => {
      vi.runAllTimers();
    });

    // A new question should be generated, and `correct` should be reset to null.
    // Since our shuffle is deterministic, the question will be the same,
    // but the key is that `correct` is reset.
    expect(result.current.correct).toBeNull();
  });

  it('should set `correct` to false for an incorrect answer', () => {
    const { result } = renderHook(() => useQuiz('hiragana'));

    // 'wo' is an incorrect answer in this set.
    act(() => {
      result.current.handleAnswerClick('wo');
    });
    expect(result.current.correct).toBe(false);

    // Fast-forward to ensure the question does NOT change on incorrect answer
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.question).toBe('ん');
    expect(result.current.correct).toBe(false); // State should persist
  });

  it('should switch quiz types and generate a new question on handleNavClick', () => {
    const { result } = renderHook(() => useQuiz('hiragana'));

    expect(result.current.question).toBe('ん'); // Initial hiragana question

    act(() => {
      result.current.handleNavClick('n1');
    });

    // The question should now be from the N1 data set.
    // The last item in n1.json is ["unaru", "to groan, to moan n."] -> ["うなる", ...].
    expect(result.current.question).toBe('to groan, to moan n.');
    const answerOptions = result.current.answers.map((ans) => ans[0]);
    expect(answerOptions).toContain('うなる');
  });
});
