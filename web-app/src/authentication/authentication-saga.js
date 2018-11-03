import {userApi} from '../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from './jwt';
import actions from './authentication-actions';
import {fetchMedia} from '../media/media-actions'

function* authenticate() {
    try {
        const token = getSavedToken();
        if (!token) {
            yield put(actions.notAuthenticated());
            return;
        }
        const response = yield axios.get(userApi, {
            headers: {Authorization: 'Bearer ' + token}
        });
        yield put(actions.authenticationSuccess({user: response.data}));
        yield put(fetchMedia());
    } catch (e) {
        yield put(actions.authenticationFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchAuthentication() {
    yield takeEvery(actions.authentication, authenticate);
}

export default watchAuthentication;
