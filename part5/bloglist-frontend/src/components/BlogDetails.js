import React from 'react';

const BlogDetails = ({ blog, likeClickHandler, removeClickHandler }) => (
  <>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <button onClick={() => likeClickHandler(blog)}>Like</button>
    <p>{blog.user.name}</p>
    <button onClick={() => removeClickHandler(blog)}>Remove</button>
  </>
);

export default BlogDetails;
