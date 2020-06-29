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

    it('User can create new blog', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('New Blog Title');
      cy.get('#author').type('Arquimedes');
      cy.get('#url').type('google.com');
      cy.get('[data-cy=submit]').click();

      cy.get('#title').should('not.contain.text', 'New Blog title');
      cy.get('[data-cy=toast-header]').contains('Success');
    });

    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'New Author',
          title: 'New Title',
          url: 'newUrl.com',
        });
        cy.visit('');
      });

      it('User can like a blog', function () {
        cy.get('[data-cy=view-details-btn]').click();
        cy.get('[data-cy=view-details-btn]').should('contain.text', 'Hide');
        cy.get('[data-cy=like-btn]').click();
        cy.get('[data-testid=blog-details]').contains('Likes: 1');
      });

      it('User can delete own blog', function () {
        cy.contains('New Title -- By: New Author');
        cy.get('[data-cy=view-details-btn]').click();
        cy.get('[data-cy=remove-btn]').click();
        cy.contains('New Title -- By: New Author').should('not.exist');
      });

      // eslint-disable-next-line quotes
      it("User CAN NOT delete another user's blog", function () {
        let otherUserId;
        const user = {
          username: 'romila',
          name: 'Ana Romila',
          password: '789012',
        };
        cy.request('POST', `${BASE_API_URL}/users`, user).then(({ body }) => {
          otherUserId = body.id;
          expect(body).to.have.property('id');
          console.log('Body: ', body);
          const newBlogObj = {
            author: 'Random Author',
            title: 'Blog of another user',
            url: 'randomUrl1.com',
            userId: otherUserId,
          };
          cy.request(
            'POST',
            `${BASE_API_URL}/testing/createBlogWithRandomUserId`,
            newBlogObj
          );
          cy.visit('');
        });

        cy.contains('Blog of another user -- By: Random Author')
          .parent()
          .find('[data-cy=view-details-btn]')
          .as('viewBtn');
        cy.get('@viewBtn').click();
        cy.contains('Blog of another user -- By: Random Author')
          .parent()
          .get('[data-cy=remove-btn]')
          .as('removeBtn');
        cy.get('@removeBtn').click();
        cy.contains('Error');
        cy.contains('Blog of another user -- By: Random Author');
      });
    });

    describe('And several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'New Author',
          title: 'Blog with 5 likes',
          url: 'newUrl.com',
          likes: 5,
        });
        cy.createBlog({
          author: 'New Author',
          title: 'Blog with 10 likes',
          url: 'newUrl.com',
          likes: 10,
        });
        cy.createBlog({
          author: 'New Author',
          title: 'Blog with 0 likes',
          url: 'newUrl.com',
          likes: 0,
        });
        cy.visit('');
      });

      it.only('Should order the blogs in ascending order by number of likes', function () {
        cy.get('li.blog').then((elements) => {
          expect(elements[0]).to.contain('Blog with 10 likes');
          expect(elements[1]).to.contain('Blog with 5 likes');
          expect(elements[2]).to.contain('Blog with 0 likes');
        });
      });
    });
  });
});
