import React from 'react';
import { Alert, Button, Box } from '@mui/material';

type MessageProps = {
  correct: boolean | null;
  correctAnswer: string | null;
  onNextQuestion: () => void;
};

const Message: React.FC<MessageProps> = ({ correct, correctAnswer, onNextQuestion }) => {
  if (correct === null) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {correct === true && <Alert severity="success">Correct!</Alert>}
      {correct === false && (
        <>
          <Alert severity="error" sx={{ mb: 2 }}>
            Wrong! The correct answer is: <strong>{correctAnswer}</strong>
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={onNextQuestion}
            fullWidth
          >
            Next Question
          </Button>
        </>
      )}
    </Box>
  );
};

export default Message;
