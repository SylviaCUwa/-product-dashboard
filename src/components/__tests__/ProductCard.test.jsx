import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: 1,
  title: 'iPhone 13',
  brand: 'Apple',
  price: 999,
  rating: 4.5,
  category: 'smartphones',
  stock: 50,
  thumbnail: 'https://example.com/image.jpg'
};

describe('ProductCard Component', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);
    
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('$999.00')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
  });

  it('displays in stock message when stock available', () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);
    expect(screen.getByText('50 in stock')).toBeInTheDocument();
  });

  it('displays out of stock message when no stock', () => {
    const outOfStock = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStock} onClick={vi.fn()} />);
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={onClick} />);
    
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={onClick} />);
    
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);
    const card = screen.getByRole('button');
    
    expect(card).toHaveAttribute('aria-label', 'View details for iPhone 13');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});