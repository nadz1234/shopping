import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/products';


const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data;
};

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
