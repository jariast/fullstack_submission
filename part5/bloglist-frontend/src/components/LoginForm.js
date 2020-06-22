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
      <div className="form-group">
        <label for="username">
          Username
          <input
            className="form-control"
            id="username"
            required
            value={username}
            onChange={userChangeHandler}
          ></input>
        </label>
      </div>
      <div class="form-group">
        <label for="password">
          Password
          <input
            id="password"
            className="form-control"
            required
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          ></input>
        </label>
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
    </form>
  </>
);

export default LoginForm;
