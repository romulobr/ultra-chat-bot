import {createAction} from 'redux-act';

const sendNewsCommand = createAction('NEWS_COMMAND');

const saveNews = createAction('SAVE_NEWS');
const newsSaveFailed = createAction('NEWS_SAVE_FAILED');
const newsSaved = createAction('NEWS_SAVED');
const fetchNews = createAction('FETCH_NEWS');
const newsFetched = createAction('NEWS_FETCHED');
const newsFetchFailed = createAction('NEWS_FETCH_FAILED');

export {saveNews};
export {newsFetched};
export {newsFetchFailed};
export {newsSaveFailed};
export {newsSaved};
export {fetchNews};
export {sendNewsCommand};

export default {
    sendNewsCommand,
    fetchNews,
    newsFetched,
    newsFetchFailed,
    saveNews,
    newsSaved,
    newsSaveFailed
};
