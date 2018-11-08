import {messageApi} from '../urls';
import {mediaUrl} from '../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import actions from './chicken-remote-actions';

function* playMedia(action) {
    try {
        yield axios.post(messageApi, {media: `${mediaUrl}/${action.payload.url}`});
    } catch (e) {
        yield put(actions.mediaFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchPlayMedia() {
    yield takeEvery(actions.playMedia, playMedia);
}

export default watchPlayMedia;
