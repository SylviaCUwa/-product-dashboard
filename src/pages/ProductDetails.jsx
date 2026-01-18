import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <Loading message="Loading product details..." />;
  }

  if (isError) {
    return (
      <ErrorMessage 
        message={error?.message || 'Failed to load product details'} 
        onRetry={refetch}
      />
    );
  }

  if (!product) {
    return (
      <ErrorMessage 
        message="Product not found" 
        onRetry={() => navigate('/products')}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
        aria-label="Go back to products list"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </button>

      {/* Product Details Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Gallery */}
          <div className="md:w-1/2 p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.images && product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} - view ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            {product.brand && (
              <p className="text-lg text-gray-600 mb-4">
                by {product.brand}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating.toFixed(1)} out of 5
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="ml-2 px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-700">Availability: </span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Additional Details */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Details
              </h2>
              <dl className="grid grid-cols-1 gap-4">
                {product.warrantyInformation && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Warranty</dt>
                    <dd className="text-sm text-gray-900">{product.warrantyInformation}</dd>
                  </div>
                )}
                {product.shippingInformation && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Shipping</dt>
                    <dd className="text-sm text-gray-900">{product.shippingInformation}</dd>
                  </div>
                )}
                {product.returnPolicy && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Return Policy</dt>
                    <dd className="text-sm text-gray-900">{product.returnPolicy}</dd>
                  </div>
                )}
                {product.minimumOrderQuantity && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Minimum Order</dt>
                    <dd className="text-sm text-gray-900">{product.minimumOrderQuantity} units</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;