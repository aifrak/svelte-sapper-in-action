import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';
import TodoList from './TodoList.svelte';

describe('TodoList', () => {
  // This is the number of todos that are automatically added in the TodoList component.
  const PREDEFINED_TODOS = 2;

  afterEach(cleanup);

  function expectTodoCount(count) {
    // This waits for the DOM to be updated; it returns a Promise.
    return waitFor(() => {
      const lis = document.querySelectorAll('li');
      expect(lis.length).toBe(count);
    });
  }

  test('should render', async () => {
    const { getByText } = render(TodoList);
    expect(getByText('To Do List'));
    expect(getByText('1 of 2 remaining'));
    expect(getByText('Archive Completed')); // button
    await expectTodoCount(PREDEFINED_TODOS);
  });

  test('should add a todo', async () => {
    const { getByTestId, getByText } = render(TodoList);

    // This requires adding the following attribute to the input element in src/TodoList.svelte:
    // data-testid="todo-input"
    const input = getByTestId('todo-input');
    const value = 'buy milk';
    fireEvent.input(input, { target: { value } });
    fireEvent.click(getByText('Add'));

    await expectTodoCount(PREDEFINED_TODOS + 1);
    expect(getByText(value));
  });

  test('should archive completed', async () => {
    const { getByText } = render(TodoList);
    fireEvent.click(getByText('Archive Completed'));
    await expectTodoCount(PREDEFINED_TODOS - 1);
    expect(getByText('1 of 1 remaining'));
  });

  test('should delete a todo', async () => {
    const { getAllByText, getByText } = render(TodoList);
    // This is the text in the first todo.
    const text = 'learn Svelte';
    expect(getByText(text));

    const deleteBtns = getAllByText('Delete');
    // This deletes the first todo.
    fireEvent.click(deleteBtns[0]);
    await expectTodoCount(PREDEFINED_TODOS - 1);
  });

  test('should toggle a todo', async () => {
    const { container, getByText } = render(TodoList);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    // This toggles the second todo.
    await fireEvent.click(checkboxes[1]);
    expect(getByText('0 of 2 remaining'));

    // This toggles the first todo.
    await fireEvent.click(checkboxes[0]);
    expect(getByText('1 of 2 remaining'));
  });
});
