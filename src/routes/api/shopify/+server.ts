import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST:RequestHandler = async ({ request }) => {
  const { query, variables } = await request.json();
  
  const response = await fetch(import.meta.env.VITE_SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });

  const result = await response.json();
  return json(result);
};
