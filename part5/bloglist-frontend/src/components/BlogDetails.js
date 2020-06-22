import React from 'react';
import PropTypes from 'prop-types';

const BlogDetails = ({ blog, likeClickHandler, removeClickHandler }) => (
  <div data-testid="blog-details" className="d-flex flex-column">
    <p>URL: {blog.url}</p>
    <div className="d-flex w-50 align-items-center">
      <span>Likes: {blog.likes}</span>
      <button
        className="btn btn-success"
        onClick={() => likeClickHandler(blog)}
      >
        Like
      </button>
    </div>

    <p>User: {blog.user.name}</p>
    <button onClick={() => removeClickHandler(blog)}>Remove</button>
  </div>
);

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  likeClickHandler: PropTypes.func.isRequired,
  removeClickHandler: PropTypes.func.isRequired,
};

export default BlogDetails;
