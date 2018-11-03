import {streamElementsTokenApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../jwt';
import actions from './stream-elements-actions';

function* fetchToken() {
    try {
        const jwtToken = getSavedToken();
        if (!jwtToken) {
            yield put(actions.notAuthenticated());
            return;
        }
        const response = yield axios.get(streamElementsTokenApi, {
            headers: {Authorization: 'Bearer ' + jwtToken}
        });
        yield put(actions.fetchTokenSuccess({user: response.data}));
    } catch (e) {
        yield put(actions.fetchTokenFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchToken() {
    yield takeEvery(actions.fetchToken, fetchToken);
}

export default watchFetchToken;
