<script>
  import Cart from './Cart.svelte';
  import NotFound from './NotFound.svelte';
  import Ship from './Ship.svelte';
  import Shop from './Shop.svelte';
  import { cartStore } from './stores';

  // This holds the page component to be rendered.
  let component;

  const hashMap = {
    '#cart': Cart,
    '#ship': Ship,
    '#shop': Shop,
  };

  // This function is called when the hash value in the URL changes.
  function hashChange() {
    component = hashMap[location.hash] || NotFound;
  }
</script>

<!--
  This is a special Svelte element that supports adding event listeners
  on the window object without having to write code to remove them when the
  component is removed from the DOM (destroyed).
-->
<svelte:window on:hashchange={hashChange} />

<nav>
  <a href="/#shop" class:active={component === Shop}>Shop</a>
  <a href="/#cart" class:active={component === Cart} class="icon">
    &#x1F6D2; {$cartStore.length}
  </a>
  <a href="/#ship" class:active={component === Ship}>Ship</a>
</nav>

<main>
  <!-- This is a special Svelte element that renders a given component -->
  <svelte:component this={component} />
</main>

<style>
  /* This defines a global CSS variable that any CSS rule can use. */
  :root {
    --space: 0.5rem;
  }

  a {
    background-color: white;
    border-radius: var(--space);
    margin-right: var(--space);
    padding: var(--space);
    text-decoration: none;
  }

  a.active {
    background-color: yellow;
  }

  .icon {
    padding-bottom: 6px;
    padding-top: 6px;
  }

  main {
    padding: var(--space);
  }

  nav {
    display: flex;
    align-items: center;
    background-color: cornflowerblue;
    padding: var(--space);
  }
</style>
