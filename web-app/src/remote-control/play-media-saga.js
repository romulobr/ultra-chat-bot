import {messageApi} from '../urls';
import {mediaUrl} from '../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import actions from './remote-control-actions';

function* playMedia(action) {
    try {
        action.payload.url = `${mediaUrl}/${action.payload.url}`;
        yield axios.post(messageApi, action.payload);
    } catch (e) {
        yield put(actions.mediaFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchPlayMedia() {
    yield takeEvery(actions.playMedia, playMedia);
}

export default watchPlayMedia;
