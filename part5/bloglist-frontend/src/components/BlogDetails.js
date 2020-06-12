import React from 'react';
import PropTypes from 'prop-types';

const BlogDetails = ({ blog, likeClickHandler, removeClickHandler }) => (
  <>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <button onClick={() => likeClickHandler(blog)}>Like</button>
    <p>{blog.user.name}</p>
    <button onClick={() => removeClickHandler(blog)}>Remove</button>
  </>
);

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  likeClickHandler: PropTypes.func.isRequired,
  removeClickHandler: PropTypes.func.isRequired,
};

export default BlogDetails;
