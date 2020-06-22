import React, { useState, useEffect } from 'react';

import './App.css';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import NewBlogForm from './components/NewBlogForm';
import Toggable from './components/Toggable';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogsByLikes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogList = () => (
    <>
      <UserInfo name={user.name} logoutClickHandler={handleLogout} />
      <Toggable buttonLabel="New Blog">
        <NewBlogForm handleBlogCreation={handleBlogCreation} />
      </Toggable>

      <h2>Blogs!</h2>
      <ul className="list-group">
        {blogs.map((blog) => (
          <Blog
            blogUpdateHandler={handleBlogUpdate}
            removeClickHandler={handleBlogDelete}
            key={blog.id}
            blog={blog}
          />
        ))}
      </ul>
    </>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      showNotification(true, 'Invalid credentials or something');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    blogService.setToken(null);
  };

  const handleBlogCreation = async (newBlogObj) => {
    try {
      const newBlog = await blogService.create(newBlogObj);
      setBlogs(blogs.concat(newBlog));
      showNotification(false, `"${newBlog.title}" has been created`);
    } catch (error) {
      showNotification(true, 'Error in blog creation');
    }
  };

  const handleBlogUpdate = async (updatedBlogObj) => {
    try {
      const updatedBlogRes = await blogService.update(updatedBlogObj);

      const modifiedBlog = blogs.find((blog) => blog.id === updatedBlogRes.id);
      modifiedBlog.likes = updatedBlogRes.likes;
      const newBlogsState = blogs
        .map((b) => (b.id === modifiedBlog.id ? modifiedBlog : b))
        .sort((a, b) => b.likes - a.likes); //Note that the map function returns a new array
      setBlogs(newBlogsState);
      showNotification(false, `"${modifiedBlog.title} liked."`);
    } catch (error) {
      showNotification(true, 'Error updating blog');
    }
  };

  const handleBlogDelete = async (blog) => {
    if (
      window.confirm(
        `Do you really want to delete "${blog.title}" by ${blog.author} info?`
      )
    ) {
      try {
        await blogService.deleteBlog(blog.id);
        const newBlogsState = blogs.filter((b) => b.id !== blog.id);
        setBlogs(newBlogsState);
        showNotification(false, `${blog.title} has been deleted`);
      } catch (error) {
        showNotification(true, 'Error deleting blog');
      }
    }
  };

  const showNotification = (isError, message) => {
    setNotification({ isError, message });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  return (
    <div className="container">
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          userChangeHandler={({ target }) => setUsername(target.value)}
          passwordChangeHandler={({ target }) => setPassword(target.value)}
          submissionHandler={handleLogin}
        />
      ) : (
        blogList()
      )}
    </div>
  );
};

export default App;
