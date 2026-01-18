import { describe, it, expect } from 'vitest';
import { render, screen } from '../../tests/test-utils';
import Loading from '../Loading';

describe('Loading Component', () => {
  it('renders loading spinner', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays default message', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays custom message', () => {
    render(<Loading message="Loading products..." />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Loading />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });
});