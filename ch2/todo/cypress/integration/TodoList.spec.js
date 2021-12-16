const baseUrl = 'http://frontend:5000/';

describe('Todo app', () => {
  it('should add todo', () => {
    cy.visit(baseUrl);
    cy.contains('1 of 2 remaining');
    // The Add button should be disabled until text is entered.
    cy.contains('Add')
      // This saves a reference to found elements for later use.
      .as('addBtn')
      .should('be.disabled');

    // This enters todo text.
    const todoText = 'buy milk';
    cy.get('[data-testid=todo-input]').as('todoInput').type(todoText);

    const addBtn = cy.get('@addBtn');
    addBtn.should('not.be.disabled');
    addBtn.click();

    // This finds the first checkbox and toggles it.
    cy.get('@todoInput').should('have.value', '');
    cy.get('@addBtn').should('be.disabled');
    cy.contains(todoText);
    cy.contains('2 of 3 remaining');
  });

  it('should toggle done', () => {
    cy.visit(baseUrl);
    cy.contains('1 of 2 remaining');

    cy.get('input[type=checkbox]').first().as('cb1').click();
    cy.contains('2 of 2 remaining');

    // This toggles the same checkbox again to show that status text returns to its previous value.
    cy.get('@cb1').check();
    cy.contains('1 of 2 remaining');
  });

  it('should delete todo', () => {
    cy.visit(baseUrl);
    cy.contains('1 of 2 remaining');

    const todoText = 'learn Svelte'; // first todo
    cy.contains('ul', todoText);

    // This clicks the first Delete button.
    cy.contains('Delete').click();
    cy.contains('ul', todoText).should('not.exist');
    cy.contains('1 of 1 remaining');
  });

  it('should archive completed', () => {
    cy.visit(baseUrl);

    const todoText = 'learn Svelte'; // first todo
    cy.contains('ul', todoText);

    // This clicks the Archive Completed button.
    cy.contains('Archive Completed').click();
    cy.contains('ul', todoText).should('not.exist');
    cy.contains('1 of 1 remaining');
  });
});
