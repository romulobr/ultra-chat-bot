import { put } from 'redux-saga/effects';
import axios from 'axios';

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

function* authentication() {
	try {
		const jwtCookie = document.cookie.split('feathers-jwt=')[1];
		console.log(jwtCookie);
		if (!jwtCookie) {
			put({ type: 'NOT_AUTHENTICATED' });
			console.log('could not find jwt cookie, user is not authenticated');
			return;
		}
		const parsedJwt = parseJwt(jwtCookie);
		console.log('querying for my user', parsedJwt);
		const response = yield axios.get('/users', {
			headers: { Authorization: 'Bearer ' + jwtCookie }
		});
		yield put({ type: 'AUTHENTICATION_SUCCESS', user: response.data.twitch});
		console.log('got a response:', response);
	} catch (e) {
		yield put({ type: 'AUTHENTICATION_FAILED', error: e });
		console.log('got an error:', e);
	}
}

export default authentication;
