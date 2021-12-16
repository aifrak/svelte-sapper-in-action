const baseUrl = 'http://frontend:5000/';

function login() {
  cy.visit(baseUrl);
  cy.contains('Username').children('input').type('username');
  cy.contains('Password').children('input').type('password');
  cy.get('button').contains('Login').click();
}

function addCategories() {
  // We must log in before adding categories.
  login();

  cy.get('[data-testid=category-name-input]').as('nameInput').type('Clothes');
  cy.get('button').contains('Add Category').click();

  // Including "{enter}" in a string passed to the type method simulates a user pressing the Enter key.
  cy.get('@nameInput').type('Toiletries{enter}');
}

function addItems() {
  // We must add categories before adding items.
  addCategories();

  // This finds the input item in the "Clothes" category.
  cy.get('[data-testid=item-input]').first().as('item-input-1').type('socks');
  cy.get('button').contains('Add Item').first().click();
  cy.get('@item-input-1').type('shoes{enter}');
  verifyStatus('Clothes', '2 of 2 remaining');

  // This finds the input item in the "Toiletries" category.
  cy.get('[data-testid=item-input]').last().type('razor{enter}');
  verifyStatus('Toiletries', '1 of 1 remaining');
}

function deleteCategory(categoryName) {
  cy.contains(new RegExp(`^${categoryName}$`))
    .siblings('button')
    .click();
}

function deleteItem(itemName) {
  cy.contains(new RegExp(`^${itemName}$`))
    .siblings('button')
    .click();
}

function togglePacked(itemName) {
  cy.contains(new RegExp(`^${itemName}$`))
    .siblings('input[type="checkbox"]')
    .click();
}

function verifyStatus(categoryName, expectedStatus) {
  cy.contains(new RegExp(`^${categoryName}$`))
    // This is useful to verify that the correct element is found.
    // It draws a red outline around all the matching elements.
    //.then(el => el.css('outline', 'solid red'))
    .siblings('span')
    .contains(expectedStatus);
}

describe('Travel Packing app', () => {
  it('should login', login);

  it('should add categories', addCategories);

  it('should add items', addItems);

  it('should toggle packed', () => {
    addItems();
    verifyStatus('Clothes', '2 of 2 remaining');

    togglePacked('shoes');
    verifyStatus('Clothes', '1 of 2 remaining');

    togglePacked('shoes');
    verifyStatus('Clothes', '2 of 2 remaining');
  });

  it('should delete item', () => {
    addItems();
    verifyStatus('Clothes', '2 of 2 remaining');

    deleteItem('shoes');
    verifyStatus('Clothes', '1 of 1 remaining');
  });

  it('should delete category', () => {
    addItems();
    verifyStatus('Toiletries', '1 of 1 remaining');

    // We must delete all items in a category before the category can be deleted.
    deleteItem('razor');
    verifyStatus('Toiletries', '0 of 0 remaining');

    const categoryName = 'Toiletries';
    // Verify that the category exists.
    cy.get('.categories h2 > span').contains(categoryName);
    deleteCategory(categoryName);
    // Verify that the category no longer exists.
    cy.get('.categories h2 > span').contains(categoryName).should('not.exist');
  });

  it('should logout', () => {
    login();
    cy.get('button').contains('Log Out').click();
    cy.contains('Login');
  });
});
