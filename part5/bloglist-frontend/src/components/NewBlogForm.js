import React, { useState } from 'react';

const NewBlogForm = ({ handleBlogCreation }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmission = (event) => {
    event.preventDefault();
    handleBlogCreation({ title, author, url });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <>
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmission}>
        <div>
          <label>
            Title
            <input
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              required
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              required
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
};

export default NewBlogForm;
