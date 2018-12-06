import {mediaApi, settingsFileApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../media-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchMedia() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(mediaApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.mediaFetched({...getResponse.data[0]}));
        } else {
            const savedData = yield axios.get(settingsFileApi + '/media');
            delete savedData.data._id;
            yield axios.post(mediaApi, savedData.data, {headers: {Authorization: 'Bearer ' + jwt}}
            );
            yield put(actions.fetchMedia());
        }
    } catch (e) {
        debugger
        yield put(actions.mediaFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchMedia() {
    yield takeEvery(actions.fetchMedia, fetchMedia);
}

export default watchFetchMedia;
