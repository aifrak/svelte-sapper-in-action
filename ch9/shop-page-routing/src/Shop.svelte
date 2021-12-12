<script>
  import items from './items';
  import { cartStore } from './stores';

  function changeQuantity(event, item) {
    const newQuantity = Number(event.target.value);
    cartStore.update((items) => {
      // If the new quantity is not zero and the old quantity is zero ...
      if (newQuantity && !item.quantity) {
        items.push(item);
        // If the new quantity is zero and the old quantity is not zero ...
      } else if (newQuantity === 0 && item.quantity) {
        const { description } = item;
        // This removes the item from the cart.
        items = items.filter((i) => i.description !== description);
      }

      item.quantity = newQuantity;

      return items;
    });
  }
</script>

<h1>Shop</h1>

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
    {#each items as item}
      <tr>
        <td>{item.description}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>
          <input
            type="number"
            min="0"
            on:input={(e) => changeQuantity(e, item)}
            value={item.quantity}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  input {
    width: 60px;
  }
</style>
