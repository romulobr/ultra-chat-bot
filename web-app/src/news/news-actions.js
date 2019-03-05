import {createAction} from 'redux-act';

const sendNEWS_OLDCommand = createAction('NEWS_OLD_COMMAND');

const saveNEWS_OLD = createAction('SAVE_NEWS_OLD');
const NEWS_OLDSaveFailed = createAction('NEWS_OLD_SAVE_FAILED');
const NEWS_OLDSaved = createAction('NEWS_OLD_SAVED');
const fetchNEWS_OLD = createAction('FETCH_NEWS_OLD');
const NEWS_OLDFetched = createAction('NEWS_OLD_FETCHED');
const NEWS_OLDFetchFailed = createAction('NEWS_OLD_FETCH_FAILED');

export {saveNEWS_OLD};
export {NEWS_OLDFetched};
export {NEWS_OLDFetchFailed};
export {NEWS_OLDSaveFailed};
export {NEWS_OLDSaved};
export {fetchNEWS_OLD};
export {sendNEWS_OLDCommand};

export default {
    sendNEWS_OLDCommand,
    fetchNEWS_OLD,
    NEWS_OLDFetched,
    NEWS_OLDFetchFailed,
    saveNEWS_OLD,
    NEWS_OLDSaved,
    NEWS_OLDSaveFailed
};
