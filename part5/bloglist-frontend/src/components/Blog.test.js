import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, queryByTestId } from '@testing-library/react';
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

  component.debug();

  expect(component.container).toHaveTextContent(
    'Blog with token auth middleware 001 -- By: RomilaView'
  );
  expect(
    queryByTestId(document.documentElement, 'blog-details')
  ).not.toBeInTheDocument();
});
