import React from 'react';

const UserInfo = ({ name, logoutClickHandler }) => (
  <div className="row">
    <p className="col-11 align-self-center">{name} is logged in!</p>
    <button
      className="btn btn-link col align-self-center"
      onClick={logoutClickHandler}
    >
      Log Out
    </button>
  </div>
);

export default UserInfo;
