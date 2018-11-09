import {createAction} from 'redux-act';

const chickenMove = createAction('CHICKEN_MOVE');
const chickenSpeak = createAction('CHICKEN_SPEAK');

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
export {chickenMove, chickenSpeak};

export default {
    chickenMove,
    chickenSpeak,
    fetchChicken,
    chickenFetched,
    chickenFetchFailed,
    saveChicken,
    chickenSaved,
    chickenSaveFailed
};
