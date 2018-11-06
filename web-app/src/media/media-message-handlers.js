import {mediaImported} from './media-actions'
import {ipcRenderer} from 'electron';

function registerRendererEvents(dispatch) {
    debugger;
    ipcRenderer.on('mediaImported', (event, args) => {
        debugger;
        dispatch(mediaImported({items: args}));
    });
}

export default registerRendererEvents;
