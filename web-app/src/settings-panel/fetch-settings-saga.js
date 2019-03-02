import {settingsFileUrlFor, settingsUrlFor} from '../urls'
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../authentication/jwt';
import actionsFor from './settings-actions';
import {notAuthenticated} from '../authentication/authentication-actions'

function watchSettingsFor(key) {
    const settings = settingsUrlFor(key);
    const settingsFile = settingsFileUrlFor(key);
    const actions = actionsFor(key);

    function* fetch() {
        try {
            const jwt = getSavedToken();
            if (!jwt) {
                yield put(notAuthenticated());
                return;
            }
            const getResponse = yield axios.get(settings, {
                headers: {Authorization: 'Bearer ' + jwt}
            });
            if (getResponse.data && getResponse.data[0]) {
                yield put(actions.fetched({...getResponse.data[0]}));
            } else {
                const savedData = yield axios.get(settingsFile);
                delete savedData.data._id;
                yield axios.post(settings, savedData.data, {headers: {Authorization: 'Bearer ' + jwt}});
                yield put(actions.fetch());
            }
        } catch (e) {
            yield put(actions.error({error: e}));
            console.log('got an error:', e);
        }
    }

    return function* watchFetchSettings() {
        yield takeEvery(actions.fetch, fetch);
    }
}

export default watchSettingsFor;
