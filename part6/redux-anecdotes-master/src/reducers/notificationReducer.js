const notificationReducer = (state = 'Test msg', action) => {
  console.log('state before action: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.msg;
    default:
      return state;
  }
};

export default notificationReducer;
