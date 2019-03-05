import {createAction} from 'redux-act';

const sendWelcomeCommand = createAction('WELCOME_OLD_COMMAND');

const saveWelcome = createAction('SAVE_WELCOME_OLD');
const welcomeSaveFailed = createAction('WELCOME_OLD_SAVE_FAILED');
const welcomeSaved = createAction('WELCOME_OLD_SAVED');
const fetchWelcome = createAction('FETCH_WELCOME_OLD');
const welcomeFetched = createAction('WELCOME_OLD_FETCHED');
const welcomeFetchFailed = createAction('WELCOME_OLD_FETCH_FAILED');

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
