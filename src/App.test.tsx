import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Regex to check for Japanese characters (Hiragana, Katakana, Kanji)
const isJapanese = (text: string) => /[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+/.test(text);

describe('App Integration Test', () => {
  it('should display Kana answers when the N3 vocabulary quiz is selected', async () => {
    render(<App />);

    const vocabularyMenuButton = screen.getByRole('button', { name: /vocabulary/i });
    fireEvent.click(vocabularyMenuButton);

    const n3MenuItem = await screen.findByText('N3');
    fireEvent.click(n3MenuItem);

    await screen.findByText('What is this?');

    const answerButtons = screen.getAllByRole('button');

    for (const button of answerButtons) {
      const buttonText = button.textContent || '';
      if (
        [
          'hiragana',
          'katakana',
          'vocabulary',
          'n5',
          'n4',
          'n3',
          'n2',
          'n1',
          'all vocabulary',
        ].includes(buttonText.toLowerCase())
      )
        continue;
      expect(isJapanese(buttonText)).toBe(true);
    }
  });

  it('should display Kana answers when the N1 vocabulary quiz is selected', async () => {
    render(<App />);

    const vocabularyMenuButton = screen.getByRole('button', { name: /vocabulary/i });
    fireEvent.click(vocabularyMenuButton);

    const n1MenuItem = await screen.findByText('N1');
    fireEvent.click(n1MenuItem);

    await screen.findByText('What is this?');

    const answerButtons = screen.getAllByRole('button');

    for (const button of answerButtons) {
      const buttonText = button.textContent || '';
      if (
        [
          'hiragana',
          'katakana',
          'vocabulary',
          'n5',
          'n4',
          'n3',
          'n2',
          'n1',
          'all vocabulary',
        ].includes(buttonText.toLowerCase())
      )
        continue;
      expect(isJapanese(buttonText)).toBe(true);
    }
  });

  it('should display Kana answers when the combined vocabulary quiz is selected', async () => {
    render(<App />);

    const vocabularyMenuButton = screen.getByRole('button', { name: /vocabulary/i });
    fireEvent.click(vocabularyMenuButton);

    const allVocabularyMenuItem = await screen.findByText('All Vocabulary');
    fireEvent.click(allVocabularyMenuItem);

    await screen.findByText('What is this?');

    const answerButtons = screen.getAllByRole('button');

    for (const button of answerButtons) {
      const buttonText = button.textContent || '';
      if (
        [
          'hiragana',
          'katakana',
          'vocabulary',
          'n5',
          'n4',
          'n3',
          'n2',
          'n1',
          'all vocabulary',
        ].includes(buttonText.toLowerCase())
      )
        continue;
      expect(isJapanese(buttonText)).toBe(true);
    }
  });
});
