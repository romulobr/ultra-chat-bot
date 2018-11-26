import {createAction} from 'redux-act';

const sendIconsCommand = createAction('ICONS_COMMAND');

const saveIcons = createAction('SAVE_ICONS');
const iconsSaveFailed = createAction('ICONS_SAVE_FAILED');
const iconsSaved = createAction('ICONS_SAVED');
const fetchIcons = createAction('FETCH_ICONS');
const iconsFetched = createAction('ICONS_FETCHED');
const iconsFetchFailed = createAction('ICONS_FETCH_FAILED');

export {saveIcons};
export {iconsFetched};
export {iconsFetchFailed};
export {iconsSaveFailed};
export {iconsSaved};
export {fetchIcons};
export {sendIconsCommand};

export default {
    sendIconsCommand,
    fetchIcons,
    iconsFetched,
    iconsFetchFailed,
    saveIcons,
    iconsSaved,
    iconsSaveFailed
};
