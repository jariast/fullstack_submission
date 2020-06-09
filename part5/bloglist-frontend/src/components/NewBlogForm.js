import React from 'react';

const NewBlogForm = ({
  title,
  author,
  url,
  titleChangeHandler,
  authorChangeHandler,
  urlChangeHandler,
  submissionHandler,
}) => (
  <>
    <h1>Create New Blog</h1>
    <form onSubmit={submissionHandler}>
      <div>
        <label>
          Title
          <input required value={title} onChange={titleChangeHandler}></input>
        </label>
      </div>
      <div>
        <label>
          Author
          <input required value={author} onChange={authorChangeHandler}></input>
        </label>
      </div>
      <div>
        <label>
          URL
          <input required value={url} onChange={urlChangeHandler}></input>
        </label>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  </>
);

export default NewBlogForm;
