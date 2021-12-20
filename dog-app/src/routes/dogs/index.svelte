<script context="module">
  /*
    This function is called before each time this component is rendered in order
    to get the dog data. Preload functions were described in chapter 16.
  */
  export async function preload() {
    try {
      // This invokes the get middleware function defined in dogs/index.json.js.
      const res = await this.fetch('dogs.json');
      if (res.ok) {
        const dogs = await res.json();

        // This creates a map of dog IDs to dog objects.
        const dogMap = dogs.reduce((acc, dog) => {
          acc[dog._id] = dog;
          return acc;
        }, {});

        /*
          Properties in the object returned here are passed to this component as
          props, in this case only dogMap.
        */
        return { dogMap };
      } else {
        // Handle errors.
        const msg = await res.text();
        this.error(res.statusCode, 'Dogs preload: ' + msg);
      }
    } catch (e) {
      this.error(500, 'Dogs preload error: ' + e.message);
    }
  }
</script>

<script>
  // The previous preload function provides this prop.
  export let dogMap = {};

  let breed = '';
  let breedInput;
  let error = '';
  let id = '';
  let name = '';

  // If we have a dog ID, we can modify the dog. Otherwise we can add a new dog.
  $: saveBtnText = id ? 'Modify' : 'Add';

  $: sortedDogs = Object.values(dogMap).sort((dog1, dog2) =>
    dog1.name.localeCompare(dog2.name)
  );

  function clearState() {
    id = breed = name = '';
    breedInput.focus();
  }

  async function deleteDog(id) {
    try {
      const options = { method: 'DELETE' };
      // This invokes the del middleware function defined in [id].json.js.
      const res = await fetch(`dogs/${id}.json`, options);
      if (!res.ok) throw new Error('failed to delete dog with id ' + id);
      delete dogMap[id];
      // This triggers an update to parts of the UI that use dogMap.
      dogMap = dogMap;
      clearState();
    } catch (e) {
      error = e.message;
    }
  }

  function editDog(dog) {
    ({ breed, name } = dog);
    id = dog._id;
  }

  // This handles both creating and updating dogs.
  async function saveDog() {
    const dog = { breed, name };
    // If id is set, we are updating a dog. Otherwise we are creating a new dog.
    if (id) dog._id = id;

    try {
      const options = {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog),
      };
      const path = id ? `dogs/${id}.json` : 'dogs.json';
      /*
        This invokes either the post middleware function defined in index.json.js
        or the put middleware function defined in [id].json.js.
      */
      const res = await fetch(path, options);
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      dogMap[result._id] = result;
      // This triggers an update to parts of the UI that use dogMap.
      dogMap = dogMap;

      clearState();
    } catch (e) {
      error = e.message;
    }
  }
</script>

<svelte:head>
  <title>Dogs</title>
</svelte:head>

<section>
  <h1>Dogs</h1>

  {#if error}
    <div class="error">Error: {error}</div>
  {:else}
    {#each sortedDogs as dog}
      <div class="dog-row">
        {dog.name} is a {dog.breed}.
        <button class="icon-btn" on:click={() => editDog(dog)}>
          <!-- pencil icon -->
          &#x270E;
        </button>
        <button class="icon-btn" on:click={() => deleteDog(dog._id)}>
          <!-- trash can icon -->
          &#x1F5D1;
        </button>
      </div>
    {/each}
  {/if}

  <form>
    <div>
      <label>Breed</label>
      <input bind:this={breedInput} bind:value={breed} />
    </div>
    <div>
      <label>Name</label>
      <input bind:value={name} />
    </div>

    <button disabled={!breed || !name} on:click={saveDog} type="button">
      {saveBtnText}
    </button>

    {#if id}
      <button on:click={clearState} type="button">Cancel</button>
    {/if}
  </form>
</section>

<style>
  button {
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
  }

  .dog-row {
    display: flex;
    align-items: center;
  }

  form {
    margin-top: 1rem;
  }

  form > div {
    margin-bottom: 0.5rem;
  }

  .icon-btn {
    background-color: transparent;
    font-size: 18px;
    margin-left: 0.5rem;
  }

  .icon-btn:hover {
    background-color: lightgreen;
  }

  input {
    border: none;
    padding: 0.5rem;
    width: 200px;
  }

  label {
    margin-right: 0.5rem;
  }

  section {
    background-color: linen;
    padding: 1rem;
  }
</style>
