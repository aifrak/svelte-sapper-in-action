import { action } from '@storybook/addon-actions';
import '../../public/global.css';
import Category from '../Category.svelte';

export default { title: 'Category' };

function getOptions(items) {
  const category = { id: 1, name: 'Clothes', items };
  return {
    Component: Category,
    props: {
      category,
      categories: { [category.id]: category },
      dnd: {},
      show: 'all',
    },
    // This writes to the Actions area of the Storybook UI to indicate that the action occurred.
    on: { delete: action('category delete dispatched') },
  };
}

export const empty = () => getOptions({});
export const nonEmpty = () =>
  getOptions({
    1: { id: 1, name: 'socks', packed: true },
    2: { id: 2, name: 'shoes', packed: false },
  });
