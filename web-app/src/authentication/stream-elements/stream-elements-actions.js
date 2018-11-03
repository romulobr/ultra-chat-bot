import {createAction} from 'redux-act';

const editToken = createAction('EDIT_TOKEN');
const editTokenCancelled = createAction('EDIT_TOKEN_CANCELLED');
const saveToken = createAction('SAVE_TOKEN');
const saveTokenSuccess = createAction('SAVE_TOKEN_SUCCESS');
const saveTokenFailed = createAction('SAVE_TOKEN_FAILED');
const fetchToken = createAction('FETCH_STREAM_ELEMENTS_TOKEN');
const fetchTokenSuccess = createAction('FETCH_STREAM_ELEMENTS_TOKEN_SUCCESS');
const fetchTokenFailed = createAction('FETCH_STREAM_ELEMENTS_TOKEN_FAILED');

export {editToken};
export {editTokenCancelled}
export {saveToken}
export {saveTokenSuccess}
export {saveTokenFailed}
export {fetchToken}
export {fetchTokenSuccess}
export {fetchTokenFailed}

export default {
    editToken,
    editTokenCancelled,
    saveToken,
    saveTokenFailed,
    saveTokenSuccess,
    fetchToken,
    fetchTokenFailed,
    fetchTokenSuccess
}
