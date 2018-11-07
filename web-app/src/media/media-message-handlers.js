import {mediaImported} from './media-actions'
import {ipcRenderer} from 'electron';

function registerRendererEvents(dispatch) {
    ipcRenderer.on('mediaImported', (event, args) => {
        dispatch(mediaImported({items: args}));
    });
}

export default registerRendererEvents;
