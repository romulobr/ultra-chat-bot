import {streamElementsTokenApi} from '../../urls';
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
        const response = yield axios.put(streamElementsTokenApi, {token: action.payload}, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield put(actions.saveTokenSuccess({items: response.data.token}));

    } catch (e) {
        console.log('error saving token', e);
        yield put(actions.saveTokenFailed({error: e}));
    }
}

function* watchSaveToken() {
    yield takeEvery(actions.saveToken, saveToken);
}

export default watchSaveToken;
