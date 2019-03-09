import {createAction} from 'redux-act';

const mediaImported = createAction('MEDIA_IMPORTED');
const importMedia = createAction('IMPORT_MEDIA');
const openMediaFolder = createAction('OPEN_MEDIA_FOLDER');
const importMediaFailed = createAction('IMPORT_MEDIA_FAILED');

export {mediaImported};
export {importMedia};
export {importMediaFailed};

export {openMediaFolder};

export default {
    mediaImported,
    openMediaFolder,
    importMedia,
    importMediaFailed
};
