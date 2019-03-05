import {createAction} from 'redux-act';

const sendChickenCommand = createAction('CHICKEN_OLD_COMMAND');

const saveChicken = createAction('SAVE_CHICKEN_OLD');
const chickenSaveFailed = createAction('CHICKEN_OLD_SAVE_FAILED');
const chickenSaved = createAction('CHICKEN_OLD_SAVED');
const fetchChicken = createAction('FETCH_CHICKEN_OLD');
const chickenFetched = createAction('CHICKEN_OLD_FETCHED');
const chickenFetchFailed = createAction('CHICKEN_OLD_FETCH_FAILED');

export {saveChicken};
export {chickenFetched};
export {chickenFetchFailed};
export {chickenSaveFailed};
export {chickenSaved};
export {fetchChicken};
export {sendChickenCommand};

export default {
    sendChickenCommand,
    fetchChicken,
    chickenFetched,
    chickenFetchFailed,
    saveChicken,
    chickenSaved,
    chickenSaveFailed
};
