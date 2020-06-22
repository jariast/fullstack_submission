import React from 'react';

const Notification = ({ notification }) => {
  const notificationClass = notification.isError ? 'error' : 'success';
  if (!notification.message) {
    return null;
  }

  return (
    <div
      className={`toast show ${notificationClass}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
    >
      <div className="toast-header">
        <strong className="mr-auto">
          {notification.isError ? 'Error' : 'Success!'}
        </strong>
      </div>
      <div className="toast-body">{notification.message}</div>
    </div>
  );
};

export default Notification;
