import {ipcRenderer} from 'electron';
import {mediaImported} from './media-actions'

function registerRendererEvents(dispatch) {
    ipcRenderer.on('mediaImported', (event, args) => {
        dispatch(mediaImported({items: args}));
    });
}

export default registerRendererEvents;
