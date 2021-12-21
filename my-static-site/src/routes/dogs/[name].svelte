<script context="module">
  // This retrieves an object describing a dog with a given name by invoking an API.
  export async function preload({ params }) {
    const { name } = params;
    const res = await this.fetch(`dogs/${name}.json`);
    if (res.ok) {
      const data = await res.json();
      if (res.status === 200) {
        // This supplies the value of the dog prop used in the HTML of this component.
        return { dog: data };
      } else {
        this.error(res.status, data.message);
      }
    } else {
      const { message } = await res.json();
      const status = message && message.endsWith('not found') ? 404 : 500;
      this.error(status, 'error getting dog data: ' + message);
    }
  }
</script>

<script>
  // The goto function navigates to a page at a given path.
  import { goto } from '@sapper/app';

  export let dog;

  function back() {
    goto('/dogs');
  }
</script>

<svelte:head>
  <title>{dog.name}</title>
</svelte:head>

<!--
  The dog object has a message property when there is an error retrieving data
  for a given dog name, as is the case with "Spot".
-->
{#if dog.message}
  <h1>{dog.message}</h1>
  <button on:click={back}>Back</button>
{:else}
  <h1>{dog.name} - {dog.breed}</h1>
  <div class="container">
    <div>
      <p>{dog.description}</p>
      <button on:click={back}>Back</button>
    </div>
    <img alt="dog" src={dog.imageUrl} />
  </div>
{/if}

<style>
  .container {
    display: flex;
  }

  img {
    height: 400px;
    margin-left: 1rem;
  }

  p {
    max-width: 300px;
  }
</style>
