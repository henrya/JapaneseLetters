import React from 'react';
import { Alert } from '@mui/material';

type MessageProps = {
  correct: boolean | null;
};

const Message: React.FC<MessageProps> = ({ correct }) => {
  if (correct === null) {
    return null;
  }

  return (
    <>
      {correct === true && <Alert severity="success">Correct!</Alert>}
      {correct === false && <Alert severity="error">Wrong</Alert>}
    </>
  );
};

export default Message;
