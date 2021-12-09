<script>
  import ColorPicker from './ColorPicker.svelte';
  let hex = '000000';
</script>

<h1>Color Picker</h1>
<ColorPicker bind:hex />
<div class="swatch" style="background-color: {hex}">
  {hex}
</div>

<input type="color" bind:value={hex} />

<style>
  .swatch {
    color: white;
    display: inline-block;
    height: 100px;
    line-height: 100px;
    text-align: center;
    width: 100px;
  }
</style>
