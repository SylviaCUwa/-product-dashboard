import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async ({ 
  page = 1, 
  limit = 10, 
  search = '',
  category = '',
  sortBy = 'newest' 
}) => {
  try {
    const skip = (page - 1) * limit;
    
    let url = '';
    
    if (search) {
      url = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    } else {
      url = `/products?limit=${limit}&skip=${skip}`;
    }
    
    const response = await api.get(url);
    let products = response.data.products;
    
    if (sortBy === 'newest') {
      products = products.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'oldest') {
      products = products.sort((a, b) => a.id - b.id);
    }
    
    return {
      products,
      total: response.data.total,
      skip: response.data.skip,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};


export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    
    return response.data.map(cat => ({
      slug: cat.slug,
      name: cat.name
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products/add', productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export default api;