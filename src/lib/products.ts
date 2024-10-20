import { shopifyQuery } from './shopifyApi';

export async function fetchProducts(fetch: typeof globalThis.fetch) {
  const query = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyQuery(query, {}, fetch);
  return response.data.products.edges.map(edge => edge.node);
}
