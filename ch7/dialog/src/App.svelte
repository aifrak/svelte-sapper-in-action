<script>
  import Dialog from './Dialog.svelte';
  let dialog;
</script>

<div>
  <button on:click={() => dialog.showModal()}>Open Dialog</button>
</div>

<Dialog title="Test Dialog" bind:dialog>
  My dialog content is very, very long.<br />
  It will not wrap by default.
</Dialog>
