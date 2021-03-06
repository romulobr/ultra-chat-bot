import {streamElementsTokenApi, streamElementsApiCheck} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from './stream-elements-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* saveToken(action) {
    console.log('trying to save token \n\n', action);
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        console.log('saving token: ', action);
        const response = yield axios.put(streamElementsTokenApi, action.payload, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield put(actions.saveTokenSuccess(response));
        try {
            if (response.data.token !== '') {
                const streamElementsUser = yield axios.get(streamElementsApiCheck, {
                    headers: {Authorization: 'Bearer ' + response.data.token}
                });
                yield put(actions.tokenVerificationSuccess(streamElementsUser.data.channels["0"].displayName));
            }
        } catch (e) {
            yield put(actions.tokenVerificationFailed(e.response));
        }

    } catch (e) {
        if (e.response.status === 404) {
            try {
                const response = yield axios.post(streamElementsTokenApi, action.payload, {
                    headers: {Authorization: 'Bearer ' + getSavedToken()}
                });
                yield put(actions.saveTokenSuccess(response));
            } catch (e) {
                console.log('error saving token', e);
                yield put(actions.saveTokenFailed(e.response));
            }
        } else {
            console.log('error saving token', e);
            yield put(actions.saveTokenFailed(e.response));
        }
    }
}

function* watchSaveToken() {
    yield takeEvery(actions.saveToken, saveToken);
}

export default watchSaveToken;
