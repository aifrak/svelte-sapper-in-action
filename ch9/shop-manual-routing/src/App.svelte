<script>
  import Cart from './Cart.svelte';
  import NavButton from './NavButton.svelte';
  import Ship from './Ship.svelte';
  import Shop from './Shop.svelte';
  import { cartStore } from './stores';

  // These are the page components.
  const pageMap = {
    cart: Cart,
    ship: Ship,
    shop: Shop,
  };

  // This holds the name of the current page to be rendered.
  let pageName = 'shop';
</script>

<nav>
  <NavButton bind:pageName name="shop">Shop</NavButton>
  <NavButton bind:pageName name="cart">
    &#x1F6D2; {$cartStore.length}
  </NavButton>
  <NavButton bind:pageName name="ship">Ship</NavButton>
</nav>

<main>
  <!-- This is a special Svelte element that renders a given component. -->
  <svelte:component this={pageMap[pageName]} />
</main>

<style>
  main {
    padding: 10px;
  }

  nav {
    display: flex;
    align-items: center;
    background-color: cornflowerblue;
    padding: 10px;
  }
</style>
