import React from 'react';

const Notification = ({ notification }) => {
  const notificationClass = notification.isError ? 'error' : 'success';
  if (!notification.message) {
    return null;
  }

  return <div className={notificationClass}>{notification.message}</div>;
};

export default Notification;
