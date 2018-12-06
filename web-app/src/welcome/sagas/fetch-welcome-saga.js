import {welcomeApi, settingsFileApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../welcome-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchWelcome() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(welcomeApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.welcomeFetched({...getResponse.data[0]}));
        } else {
            const savedData = yield axios.get(settingsFileApi + '/welcome');
            delete savedData.data._id;
            yield axios.post(welcomeApi, savedData.data, {headers: {Authorization: 'Bearer ' + jwt}});
            yield put(actions.fetchWelcome());
        }
    } catch (e) {
        yield put(actions.welcomeFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchWelcome() {
    yield takeEvery(actions.fetchWelcome, fetchWelcome);
}

export default watchFetchWelcome;
