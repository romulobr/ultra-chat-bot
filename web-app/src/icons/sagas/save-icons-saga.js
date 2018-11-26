import {iconsApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../icons-actions';
import {notAuthenticated} from '../../authentication/authentication-actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* saveIcons(action) {
    console.log('trying to save icons \n\n', action);
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        console.log('saving icons: ', action);
        const response = yield axios.put(iconsApi, action.payload, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield delay(1000);
        yield put(actions.iconsSaved({...response.data}));
    } catch (e) {
        console.log('error saving icons', e);
        yield put(actions.iconsSaveFailed({error: e}));
    }
}

function* watchSaveIcons() {
    yield takeEvery(actions.saveIcons, saveIcons);
}

export default watchSaveIcons;
