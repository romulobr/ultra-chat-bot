import {put, takeEvery} from 'redux-saga/effects';
import cookies from 'browser-cookies';
import {ipcRenderer} from 'electron';

function* connectToChat() {
    console.log('trying to connect to chat');
    try {
        const jwt = cookies.get('feathers-jwt');
        ipcRenderer.send('connectToChat', jwt);
        if (!jwt) {
            yield put({type: 'NOT_AUTHENTICATED'});
            return;
        }
    } catch (e) {
        yield put({type: 'CONNECT_TO_CHAT_ERROR', error: e});
        console.log('got an error:', e);
    }
}

function* watchStartChat() {
    yield takeEvery('CONNECT_TO_CHAT', connectToChat);
}

export default watchStartChat;
