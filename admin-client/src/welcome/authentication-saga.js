import { put } from 'redux-saga/effects';
import axios from 'axios';
import cookies from 'browser-cookies';

function* authentication() {
	try {
		const jwt = cookies.get('feathers-jwt');
		console.log('cookie ', jwt);
		if (!jwt) {
			yield put({ type: 'NOT_AUTHENTICATED' });
			console.log('could not find jwt cookie, user is not authenticated');
			return;
		}
		console.log('querying for my user', jwt);
		const response = yield axios.get('http://localhost:3000/users', {
			headers: { Authorization: 'Bearer ' + jwt }
		});
		yield put({ type: 'AUTHENTICATION_SUCCESS', user: response.data});
		console.log('got a response:', response);
	} catch (e) {
		yield put({ type: 'AUTHENTICATION_FAILED', error: e });
		console.log('got an error:', e);
	}
}

export default authentication;
