import {youtubeBroadcastsApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from './youtube-chat-controls-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetch() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(youtubeBroadcastsApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield put(actions.fetchYoutubeBroadcastsSuccess(getResponse.data || []));
    } catch (e) {
        yield put(actions.fetchYoutubeBroadcastsFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetch() {
    yield takeEvery(actions.fetchYoutubeBroadcasts, fetch);
}

export default watchFetch;
