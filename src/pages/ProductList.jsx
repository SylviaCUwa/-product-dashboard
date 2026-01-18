import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { applyFilters, getUniqueBrands } from '../utils/filterUtils';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import ProductFilters from '../components/ProductFilters';
import ProductTable from '../components/ProductTable';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import AddProductForm from '../components/AddProductForm';
import { useDebounce } from '../hooks/useDebounce';

const ProductList = () => {
  const navigate = useNavigate();

  // State management
  const [showAddForm, setShowAddForm] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const limit = 10;

  // Fetch products using custom hook
  const { data, isLoading, isError, error, refetch } = useProducts({
    page,
    limit,
    search: debouncedSearch,
    category,
    sortBy
  });

  // Apply client-side filters (brand, price)
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return applyFilters(data.products, { brand, minPrice, maxPrice });
  }, [data?.products, brand, minPrice, maxPrice]);

  // Extract unique brands from current products
  const availableBrands = useMemo(() => {
    return getUniqueBrands(data?.products);
  }, [data?.products]);

  // Event handlers
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearch('');
    setCategory('');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    setPage(1);
  };

  const handleFilterChange = () => {
    setPage(1); 
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

  // Error state
  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load products'}
        onRetry={refetch}
      />
    );
  }

  const { total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);
  const hasActiveFilters = search || category || brand || minPrice || maxPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Dashboard
        </h1>
        <p className="text-gray-600">
          Browse and manage your product inventory
        </p>
      </header>


      {!showAddForm ? (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            + Add New Product
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <AddProductForm
            onSuccess={() => {
              setShowAddForm(false);
             
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Filters */}
      <ProductFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        availableBrands={availableBrands}
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
        onFilterChange={handleFilterChange}
      />

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {total} products
        {hasActiveFilters && ' (filtered)'}
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          message="No products found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <ProductTable
            products={filteredProducts}
            onProductClick={handleProductClick}
          />

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;