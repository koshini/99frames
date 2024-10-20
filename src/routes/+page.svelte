<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  
  export let data: PageData;
  
  $: ({ moulding, glass, extras } = data);

  let selectedMoulding: string = '';
  let selectedGlass: string = '';
  let mouldingQuantity: number = 1;
  let glassQuantity: number = 1;

  let selectedExtras: { [key: string]: string } = {};
  let extrasQuantity: { [key: string]: number } = {};

  // Customer information
  let firstName: string = '';
  let lastName: string = '';
  let phoneNumber: string = '';
  let email: string = '';
  let postalCode: string = '';

  onMount(() => {
    if (moulding.length > 0) {
      selectedMoulding = moulding[0].title;
    }
    if (glass.length > 0) {
      selectedGlass = glass[0].title;
    }

     // Initialize extrasQuantity for each extra
    extras.forEach(extra => {
      extrasQuantity[extra.title] = 1;
    });
  });

  $: selectedExtrasPrice = Object.entries(selectedExtras).reduce((total, [extraTitle, optionTitle]) => {
    const extra = extras.find(e => e.title === extraTitle);
    const option = extra?.options.find(o => o.optionTitle === optionTitle);
    return total + (option ? parseFloat(option.price) * extrasQuantity[extraTitle] : 0);
  }, 0);

  $: selectedMouldingPrice = moulding.find(m => m.title === selectedMoulding)?.priceRange.minVariantPrice.amount / 100 || 0;
  $: selectedGlassPrice = glass.find(g => g.title === selectedGlass)?.priceRange.minVariantPrice.amount / 100 || 0;

  $: total = (selectedMouldingPrice * mouldingQuantity) + (selectedGlassPrice * glassQuantity) + selectedExtrasPrice;

  function handleSubmit() {
    // Handle form submission here
    console.log('Form submitted', { firstName, lastName, phoneNumber, email, postalCode });
  }
</script>

<h1>Frame Price Calculator</h1>

<h2>Mouldings</h2>
<div>
  <select bind:value={selectedMoulding}>
    {#each moulding as product}
      <option value={product.title}>{product.title} - ${product.priceRange.minVariantPrice.amount/100}</option>
    {/each}
  </select>
  <input type="number" bind:value={mouldingQuantity} min="1" />
</div>

<h2>Glass</h2>
<div>
  <select bind:value={selectedGlass}>
    {#each glass as product}
      <option value={product.title}>{product.title} - ${product.priceRange.minVariantPrice.amount/100}</option>
    {/each}
  </select>
  <input type="number" bind:value={glassQuantity} min="1" />
</div>
{#each extras as extra}
  <h2>{extra.title}</h2>
  <div>
    <select bind:value={selectedExtras[extra.title]}>
      <option value="">Select an option</option>
      {#each extra.options as option}
        <option value={option.optionTitle}>{option.optionTitle} - ${option.price}</option>
      {/each}
    </select>
    <input type="number" bind:value={extrasQuantity[extra.title]} min="1" />
  </div>
{/each}
<h2>Total</h2>
<p>${total.toFixed(2)}</p>

<h2>Customer Information</h2>
<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" bind:value={firstName} required>
  </div>
  <div>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" bind:value={lastName} required>
  </div>
  <div>
    <label for="phoneNumber">Phone Number:</label>
    <input type="tel" id="phoneNumber" bind:value={phoneNumber} required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required>
  </div>
  <div>
    <label for="postalCode">Postal Code:</label>
    <input type="text" id="postalCode" bind:value={postalCode} required>
  </div>
  <button type="submit">Submit Order</button>
</form>
