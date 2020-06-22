import React, { useState } from 'react';

import BlogDetails from './BlogDetails';

const Blog = ({ blog, blogUpdateHandler, removeClickHandler }) => {
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
    <li className="list-group-item w-50">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <h5>
          {blog.title} -- By: {blog.author}
        </h5>
        <button
          className="btn btn-outline-info"
          onClick={() => setVisibleDetails(!visibleDetails)}
        >
          {visibleDetails ? 'Hide' : 'View'}
        </button>
      </div>

      {visibleDetails && (
        <BlogDetails
          blog={blog}
          likeClickHandler={handleBlogLikeClick}
          removeClickHandler={removeClickHandler}
        ></BlogDetails>
      )}
    </li>
  );
};

export default Blog;
