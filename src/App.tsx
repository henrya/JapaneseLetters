import React from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Message from './components/Message';
import { useQuiz } from './hooks/useQuiz';
import { Container } from '@mui/material';
import AppThemeProvider from './theme/AppThemeProvider';

function App() {
  const {
    question,
    answers,
    correct,
    correctAnswer,
    handleAnswerClick,
    handleNextQuestion,
    handleNavClick,
  } = useQuiz('hiragana');

  return (
    <AppThemeProvider>
      <Header onNavClick={handleNavClick} />
      <main>
        <Container>
          {question && (
            <Quiz question={question} answers={answers} onAnswerClick={handleAnswerClick} />
          )}
          <Message
            correct={correct}
            correctAnswer={correctAnswer}
            onNextQuestion={handleNextQuestion}
          />
        </Container>
      </main>
    </AppThemeProvider>
  );
}

export default App;
