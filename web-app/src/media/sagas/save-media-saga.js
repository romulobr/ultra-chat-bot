import {mediaApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../media-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'
const delay = (ms) => new Promise(res => setTimeout(res, ms))

function validateForm(form) {
    const {items,costPerChatPlay} = form;
    const validation = {hasErrors: false, items: []};
    if (isNaN(costPerChatPlay)) {
        validation.costPerChatPlay = {hasValidationError: true, validationError: 'number'}
    }
    items.forEach(item => {
        if (!item.url || !item.command) {
            validation.items.push({
                ...item,
                hasValidationError: true,
                validationError: 'no-blank'
            });
            validation.hasErrors = true;
        } else {
            validation.items.push(item);
        }
    });
    return validation;
}

function* saveMedia(action) {
    console.log('trying to save media \n\n', action);
    try {
        const validation = validateForm(action.payload);
        if (validation.hasErrors) {
            yield put(actions.mediaValidationFailed(validation));
        } else {
            const jwt = getSavedToken();
            if (!jwt) {
                yield put(notAuthenticated());
                return;
            }
            console.log('saving media: ', action);
            const response = yield axios.put(mediaApi, action.payload, {
                headers: {Authorization: 'Bearer ' + jwt}
            });
            yield delay(1000);
            yield put(actions.mediaSaved({...response.data}));
        }
    } catch (e) {
        console.log('error saving media', e);
        yield put(actions.mediaSaveFailed({error: e}));
    }
}

function* watchSaveMedia() {
    yield takeEvery(actions.saveMedia, saveMedia);
}

export default watchSaveMedia;
