import {chickenApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../chicken-controls-actions';
import {notAuthenticated} from '../../authentication/authentication-actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* saveChicken(action) {
    console.log('trying to save chicken \n\n', action);
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        console.log('saving chicken: ', action);
        const response = yield axios.put(chickenApi, action.payload, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield delay(1000);
        yield put(actions.chickenSaved({...response.data}));
    } catch (e) {
        console.log('error saving chicken', e);
        yield put(actions.chickenSaveFailed({error: e}));
    }
}

function* watchSaveChicken() {
    yield takeEvery(actions.saveChicken, saveChicken);
}

export default watchSaveChicken;
