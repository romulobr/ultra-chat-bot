import {messageApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import actions from '../chicken-remote-actions';

function* sendChickenCommand(action) {
    try {
        yield axios.post(messageApi, {chicken: action.payload});
    } catch (e) {
        yield put(actions.mediaFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchSendChickenCommand() {
    yield takeEvery(actions.sendChickenCommand, sendChickenCommand);
}

export default watchSendChickenCommand;
