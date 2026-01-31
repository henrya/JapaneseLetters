import React, { useEffect, useRef } from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import styles from './Quiz.module.less';

type QuizProps = {
  question: string;
  answers: string[][];
  onAnswerClick: (answer: string) => void;
};

const Quiz: React.FC<QuizProps> = ({ question, answers, onAnswerClick }) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation: Press 1-4 to select answers
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      const index = parseInt(key) - 1;

      if (index >= 0 && index < answers.length) {
        onAnswerClick(answers[index][0]);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [answers, onAnswerClick]);

  return (
    <Box className={styles.quizContainer} role="main" aria-label="Japanese quiz application">
      <Typography variant="h3" component="h1" gutterBottom align="center" className={styles.title}>
        Japanese Letters
      </Typography>
      <Typography
        variant="h2"
        component="div"
        id="testletter"
        className={styles.question}
        align="center"
        role="heading"
        aria-level={2}
        aria-label={`Question: ${question}`}
      >
        {question}
      </Typography>
      <Box sx={{ my: 4, width: '100%' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          What is this?
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          role="group"
          aria-label="Answer options"
        >
          {answers.map((answer, index) => (
            <React.Fragment key={answer[0]}>
              <Grid size={{ xs: 6, sm: 3 }} sx={{ mb: 2 }}>
                <Button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => onAnswerClick(answer[0])}
                  aria-label={`Answer option ${index + 1}: ${answer[0]}`}
                  aria-keyshortcuts={`${index + 1}`}
                >
                  {answer[0]}
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ mt: 2, opacity: 0.7 }}
          aria-label="Keyboard shortcut hint"
        >
          Tip: Press 1-4 on your keyboard to select answers
        </Typography>
      </Box>
    </Box>
  );
};

export default Quiz;
