import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('calls onNavClick with the correct quiz type when Hiragana or Katakana buttons are clicked', () => {
    const onNavClick = jest.fn();
    render(<Header onNavClick={onNavClick} />);

    fireEvent.click(screen.getByText('Hiragana'));
    expect(onNavClick).toHaveBeenCalledWith('hiragana');

    fireEvent.click(screen.getByText('Katakana'));
    expect(onNavClick).toHaveBeenCalledWith('katakana');
  });

  it('renders vocabulary dropdown and calls onNavClick with correct quiz type when menu item is clicked', async () => {
    const onNavClick = jest.fn();
    render(<Header onNavClick={onNavClick} />);

    // Click the main "Vocabulary" button to open the menu
    const vocabularyButton = screen.getByRole('button', { name: /vocabulary/i });
    fireEvent.click(vocabularyButton);

    // Check if menu items are present
    const n5MenuItem = screen.getByText('N5');
    const n4MenuItem = screen.getByText('N4');
    const n3MenuItem = screen.getByText('N3');
    const n2MenuItem = screen.getByText('N2');
    const n1MenuItem = screen.getByText('N1');
    const allVocabularyMenuItem = screen.getByText('All Vocabulary');

    expect(n5MenuItem).toBeInTheDocument();
    expect(n4MenuItem).toBeInTheDocument();
    expect(n3MenuItem).toBeInTheDocument();
    expect(n2MenuItem).toBeInTheDocument();
    expect(n1MenuItem).toBeInTheDocument();
    expect(allVocabularyMenuItem).toBeInTheDocument();

    // Click N2 menu item
    fireEvent.click(n2MenuItem);
    expect(onNavClick).toHaveBeenCalledWith('n2');
    await waitFor(() => expect(screen.queryByText('N2')).not.toBeInTheDocument());

    // Click N1 menu item
    fireEvent.click(vocabularyButton);
    fireEvent.click(await screen.findByText('N1'));
    expect(onNavClick).toHaveBeenCalledWith('n1');
    await waitFor(() => expect(screen.queryByText('N1')).not.toBeInTheDocument());
  });
});
