import {createAction} from 'redux-act';

const sendIconsCommand = createAction('ICONS_OLD_COMMAND');

const saveIcons = createAction('SAVE_ICONS_OLD');
const iconsSaveFailed = createAction('ICONS_OLD_SAVE_FAILED');
const iconsSaved = createAction('ICONS_OLD_SAVED');
const fetchIcons = createAction('FETCH_ICONS_OLD');
const iconsFetched = createAction('ICONS_OLD_FETCHED');
const iconsFetchFailed = createAction('ICONS_OLD_FETCH_FAILED');

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
