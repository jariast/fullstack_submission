describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000/');
  });
  it('Shows Login Form', function () {
    cy.contains('Login into the app');
  });
});
