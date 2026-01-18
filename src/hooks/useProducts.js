import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api';

export const useProducts = ({
  page = 1,
  limit = 10,
  search = '',
  category = '',
  sortBy = 'newest'
}) => {
  return useQuery({
    queryKey: ['products', page, search, category, sortBy],
    queryFn: () => getProducts({ page, limit, search, category, sortBy }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });
};
