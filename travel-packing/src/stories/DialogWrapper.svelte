<script>
  import Dialog from '../Dialog.svelte';
  let content = 'This is some\\nlong content.';
  let dialog;
  let title = 'My Dialog Title';

  /*
    The content string is split on occurrences of \n, which is the escape
    sequence for a newline character, to support multiline content.
  */
  $: lines = content.split('\\n');
</script>

<section>
  <label>
    Title
    <input bind:value={title} />
  </label>

  <label>
    Content
    <textarea bind:value={content} />
    Insert \n to get multi-line content.
  </label>

  <button on:click={() => dialog.showModal()}>Show Dialog</button>

  <Dialog {title} bind:dialog on:close={() => dialog.close()}>
    {#each lines as line}
      <div>{line}</div>
    {/each}
  </Dialog>
</section>

<style>
  input,
  textarea {
    margin: 0 1rem 1rem 1rem;
  }

  label {
    color: white;
    display: flex;
    align-items: flex-start;
  }

  section {
    background-color: #3f6fde;
    height: 100vh;
    padding: 1rem;
  }
</style>
