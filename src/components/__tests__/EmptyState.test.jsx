import { describe, it, expect } from 'vitest';
import { render, screen } from '../../tests/test-utils';
import EmptyState from '../EmptyState';

describe('EmptyState Component', () => {
  it('renders default message', () => {
    render(<EmptyState />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<EmptyState message="Custom message" />);
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<EmptyState description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState />);
    expect(container.querySelector('.text-gray-500')).not.toBeInTheDocument();
  });
});