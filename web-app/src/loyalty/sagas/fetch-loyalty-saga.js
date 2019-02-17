import {loyaltyApi, settingsFileApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../loyalty-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchLoyalty() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(loyaltyApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.loyaltyFetched({...getResponse.data[0]}));
        } else {
            const savedData = yield axios.get(settingsFileApi + '/loyalty');
            delete savedData.data._id;
            yield axios.post(loyaltyApi, savedData.data, {headers: {Authorization: 'Bearer ' + jwt}});
            yield put(actions.fetchLoyalty());
        }
    } catch (e) {
        yield put(actions.loyaltyFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchLoyalty() {
    yield takeEvery(actions.fetchLoyalty, fetchLoyalty);
}

export default watchFetchLoyalty;
