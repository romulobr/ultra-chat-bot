import {put, takeEvery} from 'redux-saga/effects';
import {ipcRenderer} from 'electron';
import getSavedToken from './../authentication/jwt';

function* openMediaFolder() {
    console.log('opening media folder');
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
        ipcRenderer.send('openMediaFolder', jwt);
    } catch (e) {
        yield put({type: 'OPEN_MEDIA_FOLDER_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchOpenMediaFolder() {
    yield takeEvery('OPEN_MEDIA_FOLDER', openMediaFolder);
}

export default watchOpenMediaFolder;
