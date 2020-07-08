const notificationReducer = (state = null, action) => {
  console.log('state before action: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.msg;
    case 'CLEAR_MESSAGE':
      return null;
    default:
      return state;
  }
};

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    msg: message,
  };
};

export const clearMsg = () => {
  return {
    type: 'CLEAR_MESSAGE',
  };
};

export default notificationReducer;
