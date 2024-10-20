import { shopifyQuery } from './shopifyApi';

export async function fetchProducts(fetch: typeof globalThis.fetch,productType: string ) {
  const query = `
    query {
      products(first: 10, query: "product_type:${productType}") {
        edges {
          node {
            id
            title
            handle
            productType
            variants (first: 10) {
              edges {
                node {
                  price
                  title
                }
              }
            }
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
