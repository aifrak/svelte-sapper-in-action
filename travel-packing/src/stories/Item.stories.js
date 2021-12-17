import { action } from '@storybook/addon-actions';
import '../../public/global.css';
import Item from '../Item.svelte';

export default { title: 'Item' };

const getOptions = (packed) => ({
  Component: Item,
  props: {
    categoryId: 1,
    dnd: {},
    item: { id: 2, name: 'socks', packed },
  },
  // This writes to the Actions area of the Storybook UI to indicate that the action occurred.
  on: { delete: action('item delete dispatched') },
});

/*
  Each story is defined by an exported function that returns an object describing the component
  to be rendered, props to be passed to it, and handling of events dispatched by the component.
*/
export const unpacked = () => getOptions(false);
export const packed = () => getOptions(true);
