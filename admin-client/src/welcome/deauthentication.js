import cookies from 'browser-cookies';

function deauthenticate(dispatch) {
	cookies.erase('feathers-jwt');
	dispatch({ type: 'NOT_AUTHENTICATED' });
}

export default deauthenticate;
