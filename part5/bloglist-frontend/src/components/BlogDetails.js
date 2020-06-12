import React from 'react';

const BlogDetails = ({ blog, clickHandler }) => (
  <>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <button onClick={() => clickHandler(blog)}>Like</button>
    <p>{blog.user.name}</p>
  </>
);

export default BlogDetails;
