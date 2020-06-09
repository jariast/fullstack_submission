import React, { useState, useEffect } from 'react';

import './App.css';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      showNotification(true, 'Invalid credentials or something');
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
