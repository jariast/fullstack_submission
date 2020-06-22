import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, queryByTestId, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

test('New Blog Form calls onSubmit correctly', () => {
  const blogCreadtionHandlerMock = jest.fn();

  const component = render(
    <NewBlogForm handleBlogCreation={blogCreadtionHandlerMock} />
  );

  const form = component.container.querySelector('form');
  const authorInput = component.container.querySelector('#author');
  const titleInput = component.container.querySelector('#title');
  const urlInput = component.container.querySelector('#url');

  fireEvent.change(authorInput, {
    target: { value: 'New Author' },
  });

  fireEvent.change(titleInput, {
    target: { value: 'New Title' },
  });

  fireEvent.change(urlInput, {
    target: { value: 'newurl.com' },
  });
  fireEvent.submit(form);
  expect(blogCreadtionHandlerMock.mock.calls).toHaveLength(1);

  expect(blogCreadtionHandlerMock.mock.calls[0][0].author).toBe('New Author');
  expect(blogCreadtionHandlerMock.mock.calls[0][0].title).toBe('New Title');
  expect(blogCreadtionHandlerMock.mock.calls[0][0].url).toBe('newurl.com');
});
