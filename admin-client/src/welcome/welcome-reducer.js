const defaultState = {
	connected: false
};

function welcomeReducer(state, action) {
	switch (action.type) {
		case 'AUTHENTICATION_SUCCESS': {
			console.log('success:',action);
			return {
				connected: true,
				user: {...action}
			};
		}
		case 'AUTHENTICATION_FAILED': {
			return {
				connected: false,
				connectionError: {
					...action.error
				}
			};
		}
		case 'NOT_AUTHENTICATED': {
			return {connected: false}
		}
		default:
			return state || defaultState;
	}
}

export default welcomeReducer;
