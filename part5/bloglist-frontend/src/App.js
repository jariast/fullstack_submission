import React, { useState, useEffect } from 'react';

import './App.css';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({});
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
    <div>
      <UserInfo name={user.name} logoutClickHandler={handleLogout}></UserInfo>
      <NewBlogForm
        title={title}
        author={author}
        url={url}
        submissionHandler={handleBlogCreation}
        titleChangeHandler={({ target }) => setTitle(target.value)}
        authorChangeHandler={({ target }) => setAuthor(target.value)}
        urlChangeHandler={({ target }) => setUrl(target.value)}
      ></NewBlogForm>
      <h2>Blogs!</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
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

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    const newBlogObj = { title, author, url };
    try {
      const newBlog = await blogService.create(newBlogObj);
      setBlogs(blogs.concat(newBlog));
      showNotification(false, `"${newBlog.title}" has been created`);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      showNotification(true, 'Error in blog creation');
    }
  };

  const showNotification = (isError, message) => {
    setNotification({ isError, message });
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          userChangeHandler={({ target }) => setUsername(target.value)}
          passwordChangeHandler={({ target }) => setPassword(target.value)}
          submissionHandler={handleLogin}
        ></LoginForm>
      ) : (
        blogList()
      )}
    </div>
  );
};

export default App;
