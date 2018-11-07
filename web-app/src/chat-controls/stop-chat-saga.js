import {takeEvery} from 'redux-saga/effects';
import {disconnectFromChat, disconnectedFromChat} from './chat-control-actions'

const ipcRenderer = require('electron').ipcRenderer;

function* disconnect() {
    console.log('disconnecting from chat');
    ipcRenderer.send('disconnectFromChat');
}

function* watchStopChat() {
    yield takeEvery(disconnectFromChat, disconnect);
}

export default watchStopChat;
