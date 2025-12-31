import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import styles from './Quiz.module.less';

type QuizProps = {
  question: string;
  answers: string[][];
  onAnswerClick: (answer: string) => void;
};

const Quiz: React.FC<QuizProps> = ({ question, answers, onAnswerClick }) => {
  return (
    <Box className={styles.quizContainer}>
      <Typography variant="h3" component="h1" gutterBottom align="center" className={styles.title}>
        Japanese Letters
      </Typography>
      <Typography
        variant="h2"
        component="div"
        id="testletter"
        className={styles.question}
        align="center"
      >
        {question}
      </Typography>
      <Box sx={{ my: 4, width: '100%' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          What is this?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {answers.map((answer) => (
            <React.Fragment key={answer[0]}>
              <Grid size={{ xs: 6, sm: 3 }} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => onAnswerClick(answer[0])}
                >
                  {answer[0]}
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Quiz;
