import {mediaApi} from '../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from './../authentication/jwt';

function* fetchMedia() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
        const getResponse = yield axios.get(mediaApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });

        if (getResponse.data && getResponse.data[0]) {
            yield put({
                type: 'MEDIA_FETCHED',
                items: getResponse.data && getResponse.data[0].items || []
            });
        } else {
            yield axios.post(mediaApi, {items: []}, {headers: {Authorization: 'Bearer ' + jwt}}
            );
            yield put({type: 'FETCH_MEDIA'});
        }
    } catch (e) {
        yield put({type: 'MEDIA_FETCH_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchFetchMedia() {
    yield takeEvery('FETCH_MEDIA', fetchMedia);
}

export default watchFetchMedia;
