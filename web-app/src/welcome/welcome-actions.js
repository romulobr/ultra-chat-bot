import {createAction} from 'redux-act';

const sendWelcomeCommand = createAction('WELCOME_COMMAND');

const saveWelcome = createAction('SAVE_WELCOME');
const welcomeSaveFailed = createAction('WELCOME_SAVE_FAILED');
const welcomeSaved = createAction('WELCOME_SAVED');
const fetchWelcome = createAction('FETCH_WELCOME');
const welcomeFetched = createAction('WELCOME_FETCHED');
const welcomeFetchFailed = createAction('WELCOME_FETCH_FAILED');

export {saveWelcome};
export {welcomeFetched};
export {welcomeFetchFailed};
export {welcomeSaveFailed};
export {welcomeSaved};
export {fetchWelcome};
export {sendWelcomeCommand};

export default {
    sendWelcomeCommand,
    fetchWelcome,
    welcomeFetched,
    welcomeFetchFailed,
    saveWelcome,
    welcomeSaved,
    welcomeSaveFailed
};
