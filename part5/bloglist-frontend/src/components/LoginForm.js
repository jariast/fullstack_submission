import React from 'react';

const LoginForm = ({
  username,
  password,
  userChangeHandler,
  passwordChangeHandler,
  submissionHandler,
}) => (
  <>
    <h1>Login into the app</h1>
    <form onSubmit={submissionHandler}>
      <div>
        <label>
          Username
          <input required value={username} onChange={userChangeHandler}></input>
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          ></input>
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </>
);

export default LoginForm;
