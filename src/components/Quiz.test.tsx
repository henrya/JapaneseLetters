import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Quiz from './Quiz';

describe('Quiz', () => {
  it('renders the question and answers', () => {
    const question = 'あ';
    const answers = [['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え']];
    const onAnswerClick = jest.fn();

    const { getByText } = render(
      <Quiz
        question={question}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    );

    expect(getByText('あ')).toBeInTheDocument();
    expect(getByText('a')).toBeInTheDocument();
    expect(getByText('i')).toBeInTheDocument();
    expect(getByText('u')).toBeInTheDocument();
    expect(getByText('e')).toBeInTheDocument();
  });

  it('calls onAnswerClick with the correct answer when a button is clicked', () => {
    const question = 'あ';
    const answers = [['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え']];
    const onAnswerClick = jest.fn();

    const { getByText } = render(
      <Quiz
        question={question}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    );

    fireEvent.click(getByText('a'));
    expect(onAnswerClick).toHaveBeenCalledWith('a');
  });
});
