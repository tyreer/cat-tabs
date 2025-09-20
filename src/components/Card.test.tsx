import { render, screen } from '@testing-library/react';

import Card from './Card';

describe('Card', () => {
  it('renders Hello World text', () => {
    render(
      <Card>
        <h1>Hello World</h1>
      </Card>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
