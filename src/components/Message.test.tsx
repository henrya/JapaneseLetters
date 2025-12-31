import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  it('renders "Correct!" when correct is true', () => {
    const { getByText } = render(<Message correct={true} />);
    expect(getByText('Correct!')).toBeInTheDocument();
  });

  it('renders "Wrong" when correct is false', () => {
    const { getByText } = render(<Message correct={false} />);
    expect(getByText('Wrong')).toBeInTheDocument();
  });

  it('renders nothing when correct is null', () => {
    const { container } = render(<Message correct={null} />);
    expect(container.firstChild).toBeNull();
  });
});
