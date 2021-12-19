<script>
  import { stores } from '@sapper/app';
  import Nav from '../components/Nav.svelte';

  // This prop is automatically passed to all layouts.
  export let segment;

  const { page } = stores();
</script>

{#if $page.path === '/'}
  <Nav {segment} />
  <slot />
{:else}
  <Nav {segment} />
  <main>
    <section>
      <slot />
    </section>
  </main>
{/if}

<style>
  main {
    display: flex;
    justify-content: center;

    background-color: linen;
    box-sizing: border-box;
    /* The CSS variable --nav-height can be defined in static/global.css. */
    height: calc(100vh - var(--nav-height));
    padding: 2em;
    width: 100vw;
  }
</style>
