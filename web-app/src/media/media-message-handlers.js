import {ipcRenderer} from 'electron';

function registerRendererEvents(dispatch) {
    ipcRenderer.on('mediaImported', (event, args) => {
        dispatch({type: 'MEDIA_IMPORTED', items: args})
    });
}

export default registerRendererEvents;
