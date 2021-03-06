import {streamElementsTokenApi, streamElementsApiCheck, settingsFileUrlFor} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../stream-elements/stream-elements-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchToken() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(streamElementsTokenApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data) {
            yield put(actions.fetchTokenSuccess({data: getResponse.data[0]}));
            try {
                const streamElementsUser = yield axios.get(streamElementsApiCheck, {
                    headers: {Authorization: 'Bearer ' + getResponse.data[0].token}
                });
                yield put(actions.tokenVerificationSuccess(streamElementsUser.data.channels["0"].displayName));
            } catch (e) {
                yield put(actions.tokenVerificationFailed(e.response));
            }
        } else {
            const savedData = yield axios.get(settingsFileUrlFor('stream-elements-token'));
            delete savedData.data._id;
            yield axios.post(streamElementsTokenApi, savedData.data, {headers: {Authorization: 'Bearer ' + jwt}});
            yield put(actions.fetchTokenSuccess({data: savedData[0]}));
        }
    } catch (e) {
        yield put(actions.error(e));
        console.log('got an error:', e);
    }
}

function* watchFetchToken() {
    yield takeEvery(actions.fetchToken, fetchToken);
}

export default watchFetchToken;
