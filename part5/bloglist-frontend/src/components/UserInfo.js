import React from 'react';

const UserInfo = ({ name, logoutClickHandler }) => (
  <div>
    <p>{name} is logged in!</p>
    <button onClick={logoutClickHandler}>Log Out</button>
  </div>
);

export default UserInfo;
