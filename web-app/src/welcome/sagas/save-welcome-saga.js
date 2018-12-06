import {welcomeApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../welcome-actions';
import {notAuthenticated} from '../../authentication/authentication-actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* saveWelcome(action) {
    console.log('trying to save welcome \n\n', action);
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        console.log('saving welcome: ', action);
        const response = yield axios.put(welcomeApi, action.payload, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield delay(1000);
        yield put(actions.welcomeSaved({...response.data}));
    } catch (e) {
        console.log('error saving welcome', e);
        yield put(actions.welcomeSaveFailed({error: e}));
    }
}

function* watchSaveWelcome() {
    yield takeEvery(actions.saveWelcome, saveWelcome);
}

export default watchSaveWelcome;
