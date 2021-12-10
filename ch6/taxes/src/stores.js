import { derived, writable } from 'svelte/store';

const items = [
  { name: 'pencil', cost: 0.5 },
  { name: 'backpack', cost: 40 },
];
export const itemsStore = writable(items);

export const taxStore = writable(0.08);

export const itemsWithTaxStore = derived([itemsStore, taxStore], ([$itemsStore, $taxStore]) => {
  const tax = 1 + $taxStore;
  return $itemsStore.map((item) => ({ ...item, total: item.cost * tax }));
});
