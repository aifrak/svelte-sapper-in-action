<script lang="ts">
  import Dog from './Dog.svelte';
  import { add } from './math';

  /*
    The TypeScript compiler will give the following error: "error TS2345:
    Argument of type "'2'" is not assignable to parameter of type 'number'."
    However, the code will run, and the value assigned to sum will be 1
    concatenated with '2' resulting in '12'. To fix the error, pass the number 2
    instead of the string '2'.
  */
  const sum = add(1, '2');

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

<div>sum in ts = {sum}</div>
<!-- The same type error occurs -->
<div>sum in HTML = {add(1, '2')}</div>

<style global>
  body {
    background-color: linen;
  }
</style>
