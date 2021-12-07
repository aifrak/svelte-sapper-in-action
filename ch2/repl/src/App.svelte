<script>
	import Clock from './Clock.svelte';
	
  let color = 'red';
  let name = 'world';
	
	let upper = false;
	$: greeting = `Hello ${name}!`;
	$: casedGreeting = upper ? greeting.toUpperCase() : greeting;
</script>

<label for="name">Name</label>
<input id="name" bind:value={name}>

<label for="color">Color</label>
<input id="color" type="color" bind:value={color}>
<div style="background-color: {color}" class="swatch" />

<label>
  <input type="checkbox" bind:checked={upper}>
  Uppercase
</label>

<h1 style="color: {color}">{casedGreeting}</h1>

<Clock {color}/>

<style>
  .swatch {
    display: inline-block;
    height: 20px;
    width: 20px;
  }
</style>