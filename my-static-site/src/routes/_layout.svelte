<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    background-color: white;
    padding: 2em;
    box-sizing: border-box;
  }
</style>
