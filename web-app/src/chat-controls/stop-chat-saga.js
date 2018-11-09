import {takeEvery} from 'redux-saga/effects';
import {disconnectFromChat} from './chat-control-actions'

const ipcRenderer = require('electron').ipcRenderer;

function* disconnect() {
    yield ipcRenderer.send('disconnectFromChat');
}

function* watchStopChat() {
    yield takeEvery(disconnectFromChat, disconnect);
}

export default watchStopChat;
