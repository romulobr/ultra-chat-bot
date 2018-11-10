import {createAction} from 'redux-act';

const sendChickenCommand = createAction('CHICKEN_COMMAND');

const saveChicken = createAction('SAVE_CHICKEN');
const chickenSaveFailed = createAction('CHICKEN_SAVE_FAILED');
const chickenSaved = createAction('CHICKEN_SAVED');
const fetchChicken = createAction('FETCH_CHICKEN');
const chickenFetched = createAction('CHICKEN_FETCHED');
const chickenFetchFailed = createAction('CHICKEN_FETCH_FAILED');

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
