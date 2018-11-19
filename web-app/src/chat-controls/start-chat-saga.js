import {put, takeEvery} from 'redux-saga/effects';
import getSavedToken from '../authentication/jwt'
import {connectToChat} from './chat-control-actions';

const ipcRenderer = require('electron').ipcRenderer;

function* onConnectToChat(action) {
    console.log('trying to connect to chat');
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
        ipcRenderer.send('connectToChat', jwt, action.payload);
    } catch (e) {
        yield put({type: 'CONNECT_TO_CHAT_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchStartChat() {
    yield takeEvery(connectToChat, onConnectToChat);
}

export default watchStartChat;
