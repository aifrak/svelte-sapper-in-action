import { cleanup, render } from '@testing-library/svelte';
import Item from './Item.svelte';

describe('Item', () => {
  const categoryId = 1;
  // The Item component requires this prop, but it won't be used in the test, so an empty object suffices.
  const dnd = {};
  const item = { id: 2, name: 'socks', packed: false };

  afterEach(cleanup);

  test('should render', () => {
    const { getByTestId, getByText } = render(Item, { categoryId, dnd, item });
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(getByText(item.name));
    expect(getByTestId('delete'));
  });

  test('should match snapshot', () => {
    const { container } = render(Item, { categoryId, dnd, item });
    expect(container).toMatchSnapshot();
  });
});
