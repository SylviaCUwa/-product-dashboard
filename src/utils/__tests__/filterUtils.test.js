import { describe, it, expect } from 'vitest';
import {
  filterByBrand,
  filterByPriceRange,
  applyFilters,
  getUniqueBrands,
  formatPrice,
  getPriceStats
} from '../filterUtils';

const mockProducts = [
  { id: 1, brand: 'Apple', price: 999 },
  { id: 2, brand: 'Samsung', price: 799 },
  { id: 3, brand: 'Apple', price: 1299 },
  { id: 4, brand: 'Google', price: 699 },
];

describe('filterUtils', () => {
  describe('filterByBrand', () => {
    it('returns all products when no brand specified', () => {
      const result = filterByBrand(mockProducts, '');
      expect(result).toEqual(mockProducts);
    });

    it('filters products by exact brand name', () => {
      const result = filterByBrand(mockProducts, 'Apple');
      expect(result).toHaveLength(2);
      expect(result.every(p => p.brand === 'Apple')).toBe(true);
    });

    it('filters products case-insensitively', () => {
      const result = filterByBrand(mockProducts, 'apple');
      expect(result).toHaveLength(2);
    });

    it('filters products by partial brand name', () => {
      const result = filterByBrand(mockProducts, 'App');
      expect(result).toHaveLength(2);
    });
  });

  describe('filterByPriceRange', () => {
    it('returns all products when no price range specified', () => {
      const result = filterByPriceRange(mockProducts, '', '');
      expect(result).toEqual(mockProducts);
    });

    it('filters by minimum price', () => {
      const result = filterByPriceRange(mockProducts, 800, '');
      expect(result).toHaveLength(2);
      expect(result.every(p => p.price >= 800)).toBe(true);
    });

    it('filters by maximum price', () => {
      const result = filterByPriceRange(mockProducts, '', 800);
      expect(result).toHaveLength(2);
      expect(result.every(p => p.price <= 800)).toBe(true);
    });

    it('filters by price range', () => {
      const result = filterByPriceRange(mockProducts, 700, 1000);
      expect(result).toHaveLength(2);
      expect(result.every(p => p.price >= 700 && p.price <= 1000)).toBe(true);
    });
  });

  describe('applyFilters', () => {
    it('applies all filters correctly', () => {
      const result = applyFilters(mockProducts, {
        brand: 'Apple',
        minPrice: 1000,
        maxPrice: 1500
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);
    });
  });

  describe('getUniqueBrands', () => {
    it('returns empty array for null/undefined products', () => {
      expect(getUniqueBrands(null)).toEqual([]);
      expect(getUniqueBrands(undefined)).toEqual([]);
    });

    it('extracts unique brands and sorts them', () => {
      const result = getUniqueBrands(mockProducts);
      expect(result).toEqual(['Apple', 'Google', 'Samsung']);
    });

    it('filters out null/undefined brands', () => {
      const products = [...mockProducts, { id: 5, brand: null, price: 500 }];
      const result = getUniqueBrands(products);
      expect(result).toEqual(['Apple', 'Google', 'Samsung']);
    });
  });

  describe('formatPrice', () => {
    it('formats price with dollar sign and two decimals', () => {
      expect(formatPrice(999)).toBe('$999.00');
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(10)).toBe('$10.00');
    });
  });

  describe('getPriceStats', () => {
    it('returns zeros for empty array', () => {
      const result = getPriceStats([]);
      expect(result).toEqual({ min: 0, max: 0, average: 0 });
    });

    it('calculates correct statistics', () => {
      const result = getPriceStats(mockProducts);
      expect(result.min).toBe(699);
      expect(result.max).toBe(1299);
      expect(result.average).toBe(949);
    });
  });
});