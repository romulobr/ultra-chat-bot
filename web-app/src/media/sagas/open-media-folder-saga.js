import {put, takeEvery} from 'redux-saga/effects';

const ipcRenderer = require('electron').ipcRenderer;

function* openMediaFolder() {
    console.log('opening media folder');
    try {
        ipcRenderer.send('openMediaFolder');
    } catch (e) {
        yield put({type: 'OPEN_MEDIA_FOLDER_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchOpenMediaFolder() {
    yield takeEvery('OPEN_MEDIA_FOLDER', openMediaFolder);
}

export default watchOpenMediaFolder;
