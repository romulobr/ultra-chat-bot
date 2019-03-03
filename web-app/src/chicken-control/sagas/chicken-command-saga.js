import {messageApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import actions from '../chicken-controls-actions';

function* sendChickenCommand(action) {
    try {
        console.log('payload:', action.payload);
        yield axios.post(messageApi, action.payload);
    } catch (e) {
        yield put(actions.mediaFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchSendChickenCommand() {
    yield takeEvery(actions.sendChickenCommand, sendChickenCommand);
}

export default watchSendChickenCommand;
