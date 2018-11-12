import {streamLabsDataApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from './stream-labs-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

const ipcRenderer = require('electron').ipcRenderer;

function* disconnect() {
    const jwt = getSavedToken();
    if (!jwt) {
        yield put(notAuthenticated());
        return;
    }
    ipcRenderer.send('disconnectStreamlabs');
    yield axios.put(streamLabsDataApi, {}, {headers: {Authorization: 'Bearer ' + jwt}});
    yield put(actions.fetchStreamlabs());
}

function* watchDisconnect() {
    yield takeEvery(actions.disconnectStreamlabs, disconnect);
}

export default watchDisconnect;
