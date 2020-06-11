import React from 'react';

const BlogDetails = ({ blog }) => (
  <>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <button>Like</button>
    <p>{blog.user.name}</p>
  </>
);

export default BlogDetails;
