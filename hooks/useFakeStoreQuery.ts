import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/products';



// we will fetch products here using axios , and the api , we are accepting a Promise of type Product which i created.
// it will return the json response 
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data;
};

//this is a the reactQuery functiion that we will use and returns the array of products
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
