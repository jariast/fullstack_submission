import React, { useState } from 'react';

import BlogDetails from './BlogDetails';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visibleDetails, setVisibleDetails] = useState(false);

  return (
    <div style={blogStyle}>
      {blog.title} -- By: {blog.author}
      <button onClick={() => setVisibleDetails(!visibleDetails)}>
        {visibleDetails ? 'Hide' : 'View'}
      </button>
      {visibleDetails && <BlogDetails blog={blog}></BlogDetails>}
    </div>
  );
};

export default Blog;
