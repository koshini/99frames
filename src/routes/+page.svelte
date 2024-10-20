<script lang="ts">
export let data;
const { products } = data;
</script>

<h1>Products</h1>

{#if products && products.length > 0}
  {#each products as product}
    <div>
      <h2>{product.title}</h2>
      <p>{product.handle}</p>
      <p>{product.id}</p>
      <p>Price: {product.priceRange.minVariantPrice.amount}</p>
      <p>Price: {product.priceRange.maxVariantPrice.amount}</p>
    </div>
  {/each}
{:else}
  <p>No products found.</p>
{/if}
