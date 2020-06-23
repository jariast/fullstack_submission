describe('Blog App', function () {
  // beforeEach(function(){
  //     cy
  // })
  it('loads', function () {
    cy.visit('http://localhost:3000/');
    cy.contains('Login into the app');
  });
});
