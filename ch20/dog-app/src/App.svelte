<script>
  import Dog from './Dog.svelte';

  const dogs = [
    { name: 'Dasher', gender: 'male', breed: 'Whippet' },
    { name: 'Maisey', gender: 'female', breed: 'Treeing Walker Coonhound' },
    { name: 'Ramsay', gender: 'male', breed: 'Native American Indian Dog' },
    { name: 'Oscar ', gender: 'male', breed: 'German Shorthaired Pointer' },
  ];
</script>

{#each dogs as { name, breed, gender }}
  <Dog {name} {breed} {gender} />
{/each}

<style global>
  body {
    background-color: linen;
  }
</style>
