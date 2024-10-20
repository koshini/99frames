import { error } from '@sveltejs/kit';

export async function shopifyQuery(query: string, variables: Record<string, any> = {}, fetch: typeof globalThis.fetch = globalThis.fetch) {
  try {
    const response = await fetch('/api/shopify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    console.error('Error in shopifyQuery:', e);
    throw error(500, 'Failed to fetch data from Shopify');
  }
}
