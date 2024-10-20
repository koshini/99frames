import { fetchProducts } from '$lib/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  console.log('Load function called');
  try {
    const mouldings = await fetchProducts(fetch,"moulding");
    const glass = await fetchProducts(fetch,"glass");
    const extras = await fetchProducts(fetch,"extras");
    // const extrasVariants = extras.map(extra => extra.variants.edges.map(({node}) => ({title: node.title, price: node.price})));
    const extrasVariants = extras.map(extra => ({
      title: extra.title,
      options: extra.variants.edges.map(({node}) => ({
        optionTitle: node.title,
        price: node.price
      }))
    }));
    console.log('Products fetched:', mouldings, glass, extrasVariants);
    console.log(extrasVariants[6].options);
    return { moulding: mouldings, glass: glass, extras: extrasVariants };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [] };
  }
};
