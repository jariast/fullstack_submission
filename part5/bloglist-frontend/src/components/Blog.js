import React, { useState } from 'react';

import BlogDetails from './BlogDetails';

const Blog = ({ blog, blogUpdateHandler, removeClickHandler }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visibleDetails, setVisibleDetails] = useState(false);

  const handleBlogLikeClick = (blog) => {
    const updatedBlogObj = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    blogUpdateHandler(updatedBlogObj);
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} -- By: {blog.author}
      <button onClick={() => setVisibleDetails(!visibleDetails)}>
        {visibleDetails ? 'Hide' : 'View'}
      </button>
      {visibleDetails && (
        <BlogDetails
          blog={blog}
          likeClickHandler={handleBlogLikeClick}
          removeClickHandler={removeClickHandler}
        ></BlogDetails>
      )}
    </div>
  );
};

export default Blog;
