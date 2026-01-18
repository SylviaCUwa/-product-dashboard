import { memo } from 'react';

const ProductCard = memo(({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
    >
      <div className="flex gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-20 h-20 rounded object-cover"
          loading="lazy"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center text-sm">
              <span className="text-yellow-400 mr-1">★</span>
              {product.rating.toFixed(1)}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              {product.category}
            </span>
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
