import {streamLabsDataApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../stream-labs/stream-labs-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchData() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(streamLabsDataApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.fetchSuccess({...getResponse.data[0]}));
        } else {
            yield axios.post(streamLabsDataApi, {}, {headers: {Authorization: 'Bearer ' + jwt}}
            );
            yield put(actions.fetchSuccess());
        }
    } catch (e) {
        yield put(actions.fetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchData() {
    yield takeEvery(actions.fetchStreamlabs, fetchData);
}

export default watchFetchData;
