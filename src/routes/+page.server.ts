import { fetchProducts } from '$lib/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('Load function called');
  try {
    const products = await fetchProducts(fetch);
    console.log('Products fetched:', products);
    return { products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [] };
  }
};
