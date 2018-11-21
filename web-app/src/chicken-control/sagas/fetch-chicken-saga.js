import {chickenApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../chicken-controls-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchChicken() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(chickenApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.chickenFetched({...getResponse.data[0]}));
        } else {
            yield axios.post(chickenApi, {items: []}, {headers: {Authorization: 'Bearer ' + jwt}}
            );
            yield put(actions.fetchChicken());
        }
    } catch (e) {
        yield put(actions.chickenFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchChicken() {
    yield takeEvery(actions.fetchChicken, fetchChicken);
}

export default watchFetchChicken;
