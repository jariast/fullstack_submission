describe('Blog App', function () {
  const BASE_API_URL = Cypress.env('BASE_API_URL');
  beforeEach(function () {
    cy.request('POST', `${BASE_API_URL}testing/reset`);
    const user = {
      username: 'camono',
      name: 'Camilo Arias',
      password: '123456',
    };
    cy.request('POST', `${BASE_API_URL}users`, user);
    cy.visit('');
  });
  it('Shows Login Form', function () {
    cy.contains('Login into the app');
  });

  it('User with valid credentials CAN login', function () {
    cy.get('#username').type('camono');
    cy.get('#password').type('123456');
    cy.get('button').click();
    cy.contains('Blogs!');
  });

  it('User with invalid credentials CAN NOT login', function () {
    cy.get('#username').type('camonod1');
    cy.get('#password').type('12345dsad6');
    cy.get('button').click();
    cy.contains('Error');
  });
});
