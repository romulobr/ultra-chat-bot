import {put, takeEvery} from 'redux-saga/effects';
import getSavedToken from '../authentication/jwt'

const ipcRenderer = require('electron').ipcRenderer;

function* connectToChat(action) {
    console.log('trying to connect to chat');
    try {
        debugger;
        const jwt = getSavedToken();
        if (!jwt) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
        ipcRenderer.send('connectToChat', jwt, {liveChatId:action.payload});
    } catch (e) {
        yield put({type: 'CONNECT_TO_CHAT_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchStartChat() {
    yield takeEvery('CONNECT_TO_CHAT', connectToChat);
}

export default watchStartChat;
