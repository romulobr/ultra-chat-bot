const defaultState = {
  connected: false,
  loading: true
};

function authenticationReducer(state, action) {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS': {
      return {
        connected: true,
        loading: false,
        user: action.user
      };
    }
    case 'AUTHENTICATION_FAILED': {
      return {
        connected: false,
        loading: false,
        connectionError: {
          ...action.error
        }
      };
    }
    case 'NOT_AUTHENTICATED': {
      return {
        connected: false,
        loading: false
      };
    }
    default:
      return state || defaultState;
  }
}

export default authenticationReducer;
