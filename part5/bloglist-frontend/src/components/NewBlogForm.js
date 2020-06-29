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
        <div className="form-group">
          <label htmlFor="title">
            Title
            <input
              id="title"
              className="form-control"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="author">
            Author
            <input
              id="author"
              className="form-control"
              required
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="url">
            URL
            <input
              id="url"
              className="form-control"
              required
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            ></input>
          </label>
        </div>
        <div className="form-group">
          <button className="btn btn-success" data-cy="submit" type="submit">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewBlogForm;
