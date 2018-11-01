import {put, takeEvery} from 'redux-saga/effects';
import {ipcRenderer} from 'electron';
import getSavedToken from '../../authentication/jwt';

function* importMedia() {
    console.log('trying to importMedia');
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
        ipcRenderer.send('importMedia', jwt);

    } catch (e) {
        yield put({type: 'IMPORT_MEDIA_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchFetchMedia() {
    yield takeEvery('IMPORT_MEDIA', importMedia);
}

export default watchFetchMedia;
