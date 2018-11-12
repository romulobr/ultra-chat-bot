import {userApi} from '../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from './jwt';
import actions from './authentication-actions';
import {fetchMedia} from '../media/media-actions'
import {fetchToken} from './stream-elements/stream-elements-actions';
import {fetchChicken} from '../chicken-remote/chicken-remote-actions';
import {fetchStreamlabs} from './stream-labs/stream-labs-actions';

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
        yield put(fetchChicken());
        yield put(fetchToken());
        yield put(fetchStreamlabs());
    } catch (e) {
        yield put(actions.authenticationFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchAuthentication() {
    yield takeEvery(actions.authentication, authenticate);
}

export default watchAuthentication;
