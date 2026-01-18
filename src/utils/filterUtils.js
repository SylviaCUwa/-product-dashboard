export const filterByBrand = (products, brand) => {
  if (!brand) return products;
  return products.filter(p => p.brand?.toLowerCase().includes(brand.toLowerCase()));
};

export const filterByPriceRange = (products, minPrice, maxPrice) => {
  let filtered = [...products];
  if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  return filtered;
};

export const applyFilters = (products, { brand, minPrice, maxPrice }) => {
  let filtered = products;
  filtered = filterByBrand(filtered, brand);
  filtered = filterByPriceRange(filtered, minPrice, maxPrice);
  return filtered;
};

export const getUniqueBrands = (products) => {
  if (!products) return [];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  return brands.sort();
};

export const formatPrice = (price) => `$${price.toFixed(2)}`;

export const getPriceStats = (products) => {
  if (!products || products.length === 0) return { min: 0, max: 0, average: 0 };
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    average: prices.reduce((a, b) => a + b, 0) / prices.length
  };
};
