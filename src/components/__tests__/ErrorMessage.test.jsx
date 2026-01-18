import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('displays default message when no message provided', () => {
    render(<ErrorMessage />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders retry button when onRetry provided', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage onRetry={onRetry} />);
    expect(screen.getByRole('button', { name: /retry loading data/i })).toBeInTheDocument();
  });

  it('does not render retry button when onRetry not provided', () => {
    render(<ErrorMessage />);
    expect(screen.queryByRole('button', { name: /retry loading data/i })).not.toBeInTheDocument();
  });

  it('calls onRetry when retry button clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorMessage onRetry={onRetry} />);

    const retryButton = screen.getByRole('button', { name: /retry loading data/i });
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<ErrorMessage message="Test error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });
});