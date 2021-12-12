<script>
  import page from 'page';

  export let p1; // required
  export let p2 = undefined; // optional
  export let q1; // required
  export let q2 = undefined; // optional

  console.log('Page1 $$props =', $$props);
</script>

<h1>Page 1</h1>
<div>p1 = {p1}</div>
<div>p2 = {p2}</div>
<div>q1 = {q1}</div>
<div>q2 = {q2}</div>

<button on:click={() => page.show('/two')}> Go To Page Two </button>

<style>
  button {
    margin-top: 1rem;
  }
</style>
