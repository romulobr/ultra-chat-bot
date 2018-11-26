import {messageApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import actions from '../icons-actions';

function* sendIconsCommand(action) {
    try {
        yield axios.post(messageApi, {icons: action.payload});
    } catch (e) {
        yield put(actions.mediaFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchSendIconsCommand() {
    yield takeEvery(actions.sendIconsCommand, sendIconsCommand);
}

export default watchSendIconsCommand;
