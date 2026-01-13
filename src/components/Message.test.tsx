import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Message from './Message';

describe('Message', () => {
  const mockOnNextQuestion = jest.fn();

  beforeEach(() => {
    mockOnNextQuestion.mockClear();
  });

  it('renders "Correct!" when correct is true', () => {
    render(
      <Message
        correct={true}
        correctAnswer="ka"
        onNextQuestion={mockOnNextQuestion}
      />
    );
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('renders wrong message with correct answer when correct is false', () => {
    render(
      <Message
        correct={false}
        correctAnswer="ka"
        onNextQuestion={mockOnNextQuestion}
      />
    );
    expect(screen.getByText(/Wrong! The correct answer is:/)).toBeInTheDocument();
    expect(screen.getByText('ka')).toBeInTheDocument();
    expect(screen.getByText('Next Question')).toBeInTheDocument();
  });

  it('calls onNextQuestion when Next Question button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Message
        correct={false}
        correctAnswer="ka"
        onNextQuestion={mockOnNextQuestion}
      />
    );

    const nextButton = screen.getByText('Next Question');
    await user.click(nextButton);

    expect(mockOnNextQuestion).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when correct is null', () => {
    const { container } = render(
      <Message
        correct={null}
        correctAnswer={null}
        onNextQuestion={mockOnNextQuestion}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
