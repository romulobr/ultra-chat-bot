import {loyaltyApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../loyalty-actions';
import {notAuthenticated} from '../../authentication/authentication-actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* saveLoyalty(action) {
    console.log('trying to save loyalty \n\n', action);
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        console.log('saving loyalty: ', action);
        const response = yield axios.put(loyaltyApi, action.payload, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield delay(1000);
        yield put(actions.loyaltySaved({...response.data}));
    } catch (e) {
        console.log('error saving loyalty', e);
        yield put(actions.loyaltySaveFailed({error: e}));
    }
}

function* watchSaveLoyalty() {
    yield takeEvery(actions.saveLoyalty, saveLoyalty);
}

export default watchSaveLoyalty;
