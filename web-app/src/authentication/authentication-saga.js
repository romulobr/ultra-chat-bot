import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from './jwt';

function* authenticate() {
    try {
        const token = getSavedToken();
        if (!token) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
        const response = yield axios.get('http://localhost:3000/users', {
            headers: {Authorization: 'Bearer ' + token}
        });
        yield put({type: 'AUTHENTICATION_SUCCESS', user: response.data});
        yield put({type: 'FETCH_MEDIA'});
    } catch (e) {
        yield put({type: 'AUTHENTICATION_FAILED', error: e});
        console.log('got an error:', e);
    }
}

function* watchAuthentication() {
    yield takeEvery('AUTHENTICATION', authenticate);
}

export default watchAuthentication;
