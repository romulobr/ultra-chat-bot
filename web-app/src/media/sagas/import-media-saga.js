import {put, takeEvery} from 'redux-saga/effects';
import actions from '../media-actions';

const ipcRenderer = require('electron').ipcRenderer;

function* importMedia() {
    console.log('trying to importMedia');
    try {
        ipcRenderer.send('importMedia');

    } catch (e) {
        yield put(actions.importMediaFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchMedia() {
    yield takeEvery('IMPORT_MEDIA', importMedia);
}

export default watchFetchMedia;
