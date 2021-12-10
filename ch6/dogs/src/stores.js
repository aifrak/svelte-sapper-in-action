import { derived, writable } from 'svelte/store';

export const dogStore = writable({});

export const bigDogsStore = derived(dogStore, (store) =>
  Object.values(store).filter((dog) => dog.size === 'large')
);
