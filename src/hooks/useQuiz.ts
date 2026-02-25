import { useState, useEffect, useCallback, useMemo } from 'react';
import { shuffleArray } from '../utils/arrayUtils';
import hiragana from '../data/hiragana.json';
import katakana from '../data/katakana.json';
import n5 from '../data/n5.json';
import n4 from '../data/n4.json';
import n3 from '../data/n3.json';
import n2 from '../data/n2.json';
import n1 from '../data/n1.json';

// Constants for quiz configuration
const ANSWER_COUNT = 4;
const CORRECT_ANSWER_DELAY_MS = 1000;

export type QuizType = 'hiragana' | 'katakana' | 'n5' | 'n4' | 'n3' | 'n2' | 'n1' | 'vocabulary';

const data: Record<Exclude<QuizType, 'vocabulary'>, string[][]> = {
  hiragana,
  katakana,
  n5,
  n4,
  n3,
  n2,
  n1,
};

export const useQuiz = (initialQuizType: QuizType) => {
  const [quiz, setQuiz] = useState<QuizType>(initialQuizType);
  const [question, setQuestion] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  // Memoize vocabulary data to avoid recreating the array on every render
  const vocabularyData = useMemo(
    () => [...data.n5, ...data.n4, ...data.n3, ...data.n2, ...data.n1],
    []
  );

  const generateQuestion = useCallback(() => {
    const quizItems = quiz === 'vocabulary' ? vocabularyData : data[quiz];

    // Shuffle once and select the first ANSWER_COUNT items
    const shuffled = shuffleArray(quizItems);
    const selected = shuffled.slice(0, ANSWER_COUNT);
    const answer = selected[0];

    // For hiragana/katakana, the question is the kana (index 1), answer is romaji (index 0).
    // For vocabulary, the question is the english (index 1), answer is kana (index 0).
    const questionIndex = 1;
    const answerIndex = 0;

    setQuestion(answer[questionIndex]);
    setCorrectAnswer(answer[answerIndex]);
    // Shuffle the selected answers for display
    setAnswers(shuffleArray(selected));
    setCorrect(null);
  }, [quiz, vocabularyData]);

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === correctAnswer;
    setCorrect(isCorrect);

    // Auto-advance only on correct answers
    if (isCorrect) {
      setTimeout(() => {
        generateQuestion();
      }, CORRECT_ANSWER_DELAY_MS);
    }
  };

  const handleNextQuestion = () => {
    generateQuestion();
  };

  const handleNavClick = (quizType: QuizType) => {
    setQuiz(quizType);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQuestion();
  }, [quiz, generateQuestion]);

  return {
    question,
    answers,
    correct,
    correctAnswer,
    handleAnswerClick,
    handleNextQuestion,
    handleNavClick,
  };
};
