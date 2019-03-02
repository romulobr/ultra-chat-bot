import {settingsUrlFor} from '../urls'
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../authentication/jwt';
import actionsFor from './settings-actions';
import {notAuthenticated} from '../authentication/authentication-actions'

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function saveSettingsFor(key) {
    const settings = settingsUrlFor(key);
    const actions = actionsFor(key);

    function* save(action) {
        console.log('trying to save settings \n\n', action);
        try {
            const jwt = getSavedToken();
            if (!jwt) {
                yield put(notAuthenticated());
                return;
            }
            console.log('saving settings: ', action);
            const response = yield axios.put(settings, action.payload, {
                headers: {Authorization: 'Bearer ' + jwt}
            });
            yield delay(1000);
            yield put(actions.saved({...response.data}));
        } catch (e) {
            console.log('error saving settings', e);
            yield put(actions.error({error: e}));
        }
    }

    return function* watchSave() {
        yield takeEvery(actions.save, save);
    }
}

export default saveSettingsFor;
