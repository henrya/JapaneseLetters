import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../utils/arrayUtils';
import hiragana from '../data/hiragana.json';
import katakana from '../data/katakana.json';
import n5 from '../data/n5.json';
import n4 from '../data/n4.json';
import n3 from '../data/n3.json';
import n2 from '../data/n2.json';
import n1 from '../data/n1.json';

export type QuizType =
  | 'hiragana'
  | 'katakana'
  | 'n5'
  | 'n4'
  | 'n3'
  | 'n2'
  | 'n1'
  | 'vocabulary';

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

  const generateQuestion = useCallback(() => {
    const quizItems =
      quiz === 'vocabulary'
        ? [...data.n5, ...data.n4, ...data.n3, ...data.n2, ...data.n1]
        : data[quiz];

    const randomized = shuffleArray(quizItems);
    const selected = randomized.slice(0, 4);
    const answer = selected[0];

    // For hiragana/katakana, the question is the kana, answer is romaji.
    // For vocabulary, the question is the english, answer is kana.
    const questionIndex = ['hiragana', 'katakana'].includes(quiz) ? 1 : 1;
    const answerIndex = 0;

    setQuestion(answer[questionIndex]);
    setCorrectAnswer(answer[answerIndex]);
    setAnswers(shuffleArray(selected));
    setCorrect(null);
  }, [quiz]);

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === correctAnswer;
    setCorrect(isCorrect);

    if (isCorrect) {
      setTimeout(() => {
        generateQuestion();
      }, 1000);
    }
  };

  const handleNavClick = (quizType: QuizType) => {
    setQuiz(quizType);
  };

  useEffect(() => {
    generateQuestion();
  }, [quiz, generateQuestion]);

  return {
    question,
    answers,
    correct,
    handleAnswerClick,
    handleNavClick,
  };
};
