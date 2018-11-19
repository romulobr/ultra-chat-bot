import {takeEvery} from 'redux-saga/effects';
import {disconnectFromChat} from './chat-control-actions'

const ipcRenderer = require('electron').ipcRenderer;

function* onDisconnect(action) {
    yield ipcRenderer.send('disconnectFromChat', action.payload);
}

function* watchStopChat() {
    yield takeEvery(disconnectFromChat, onDisconnect);
}

export default watchStopChat;
