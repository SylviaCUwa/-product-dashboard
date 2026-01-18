import { useCategories } from '../hooks/useCategories';

const ProductFilters = ({
  searchInput,
  setSearchInput,
  category,
  setCategory,
  brand,
  setBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  availableBrands = [],
  onSearch,
  onClearFilters,
  onFilterChange
}) => {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const hasActiveFilters = searchInput || category || brand || minPrice || maxPrice;

  const handleCategoryChange = (value) => {
    setCategory(value);
    onFilterChange?.();
  };

  const handleBrandChange = (value) => {
    setBrand(value);
    onFilterChange?.();
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    onFilterChange?.();
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    onFilterChange?.();
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={onSearch} className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by product name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search products by name"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter by category"
              disabled={categoriesLoading}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => handleBrandChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter by brand"
            >
              <option value="">All Brands</option>
              {availableBrands.map((brandName) => (
                <option key={brandName} value={brandName}>
                  {brandName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
              min="0"
              step="0.01"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Minimum price filter"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
              min="0"
              step="0.01"
              placeholder="999999"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Maximum price filter"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Sort products"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                type="button"
                onClick={onClearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
            {searchInput && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: {searchInput}
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="ml-2 hover:text-blue-900 font-bold"
                  aria-label="Clear search"
                >
                  ×
                </button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Category: {categories.find(c => c.slug === category)?.name || category}
                <button
                  type="button"
                  onClick={() => handleCategoryChange('')}
                  className="ml-2 hover:text-green-900 font-bold"
                  aria-label="Clear category filter"
                >
                  ×
                </button>
              </span>
            )}
            {brand && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Brand: {brand}
                <button
                  type="button"
                  onClick={() => handleBrandChange('')}
                  className="ml-2 hover:text-purple-900 font-bold"
                  aria-label="Clear brand filter"
                >
                  ×
                </button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                Price: ${minPrice || '0'} - ${maxPrice || '∞'}
                <button
                  type="button"
                  onClick={() => {
                    handleMinPriceChange('');
                    handleMaxPriceChange('');
                  }}
                  className="ml-2 hover:text-yellow-900 font-bold"
                  aria-label="Clear price filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductFilters;
