import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  queryByTestId,
  fireEvent,
  getByTestId,
} from '@testing-library/react';
import Blog from './Blog';

test('renders only Blog Name and Author', () => {
  const blog = {
    author: 'Romila',
    id: 2,
    likes: 40,
    title: 'Blog with token auth middleware 001',
    url: 'google.com',
    user: {
      id: 453,
      name: 'Carla Carlson',
      username: 'spookyBoogie',
    },
  };

  const component = render(<Blog blog={blog}></Blog>);

  expect(component.container).toHaveTextContent(
    'Blog with token auth middleware 001 -- By: RomilaView'
  );
  expect(
    queryByTestId(document.documentElement, 'blog-details')
  ).not.toBeInTheDocument();
});

test('Clicking View button shows blog details', () => {
  const blog = {
    author: 'Romila',
    id: 2,
    likes: 40,
    title: 'Blog with token auth middleware 001',
    url: 'google.com',
    user: {
      id: 453,
      name: 'Carla Carlson',
      username: 'spookyBoogie',
    },
  };
  const mockHandler = jest.fn();
  const component = render(
    <Blog
      blog={blog}
      likeClickHandler={mockHandler}
      removeClickHandler={() => {}}
    ></Blog>
  );

  const viewButton = component.getByText('View');
  fireEvent.click(viewButton);

  expect(
    queryByTestId(document.documentElement, 'blog-details')
  ).toBeInTheDocument();

  const likesElement = component.getByTestId('blog-likes');
  expect(likesElement).toHaveTextContent('Likes: 40');

  const urlElement = component.getByTestId('blog-url');
  expect(urlElement).toHaveTextContent('URL: google.com');
});
