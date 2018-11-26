import {iconsApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../icons-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchIcons() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(iconsApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.iconsFetched({...getResponse.data[0]}));
        } else {
            yield axios.post(iconsApi, {}, {headers: {Authorization: 'Bearer ' + jwt}}
            );
            yield put(actions.fetchIcons());
        }
    } catch (e) {
        yield put(actions.iconsFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchIcons() {
    yield takeEvery(actions.fetchIcons, fetchIcons);
}

export default watchFetchIcons;
