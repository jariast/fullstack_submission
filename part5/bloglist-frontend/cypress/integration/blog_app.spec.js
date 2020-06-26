describe('Blog App', function () {
  const BASE_API_URL = Cypress.env('BASE_API_URL');
  beforeEach(function () {
    cy.request('POST', `${BASE_API_URL}/testing/reset`);
    const user = {
      username: 'camono',
      name: 'Camilo Arias',
      password: '123456',
    };
    cy.request('POST', `${BASE_API_URL}/users`, user);
  });
  it('Shows Login Form', function () {
    cy.visit('');
    cy.contains('Login into the app');
  });

  it('User with valid credentials CAN login', function () {
    cy.visit('');
    cy.get('#username').type('camono');
    cy.get('#password').type('123456');
    cy.get('button').click();
    cy.contains('Blogs!');
  });

  it('User with invalid credentials CAN NOT login', function () {
    cy.visit('');
    cy.get('#username').type('camonod1');
    cy.get('#password').type('12345dsad6');
    cy.get('button').click();
    cy.contains('Error');
  });

  describe('When user is logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'camono', password: '123456' });
    });

    it.only('User can create new blog', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('New Blog Title');
      cy.get('#author').type('Arquimedes');
      cy.get('#url').type('google.com');
      cy.get('[data-cy=submit]').click();

      cy.get('#title').should('not.contain.text', 'New Blog title');
      cy.get('[data-cy=toast-header]').contains('Success');
    });
  });
});
