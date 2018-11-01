import {createAction} from 'redux-act';

const saveMedia = createAction('SAVE_MEDIA');
const mediaValidationFailed = createAction('MEDIA_VALIDATION_FAILED');
const mediaSaveFailed = createAction('MEDIA_SAVE_FAILED');
const mediaSaved = createAction('MEDIA_SAVED');
const fetchMedia = createAction('FETCH_MEDIA');
const mediaFetched = createAction('MEDIA_FETCHED');
const mediaFetchFailed = createAction('MEDIA_FETCH_FAILED');
const mediaImported = createAction('MEDIA_IMPORTED');
const importMedia = createAction('IMPORT_MEDIA');
const openMediaFolder = createAction('OPEN_MEDIA_FOLDER');

export {saveMedia};
export {mediaFetched};
export {mediaFetchFailed};
export {mediaImported};
export {importMedia};
export {mediaSaveFailed};
export {mediaSaved};
export {mediaValidationFailed};
export {fetchMedia};
export {openMediaFolder};

export default {
    saveMedia,
    mediaValidationFailed,
    mediaSaved,
    mediaSaveFailed,
    fetchMedia,
    mediaFetched,
    mediaFetchFailed,
    mediaImported,
    openMediaFolder,
    importMedia
};
