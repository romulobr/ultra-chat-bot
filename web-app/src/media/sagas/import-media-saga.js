import {put, takeEvery} from 'redux-saga/effects';
import getSavedToken from '../../authentication/jwt';
import actions from '../media-actions';
import {notAuthenticated} from '../../authentication/authentication-actions';
const ipcRenderer = require('electron').ipcRenderer;

function* importMedia() {
    console.log('trying to importMedia');
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        ipcRenderer.send('importMedia', jwt);

    } catch (e) {
        yield put(actions.importMediaFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchMedia() {
    yield takeEvery('IMPORT_MEDIA', importMedia);
}

export default watchFetchMedia;
