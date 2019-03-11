import {mediaImported} from './media-actions'
import {ipcRenderer} from 'electron';
import getSettingActionsFor from '../settings-panel/settings-actions'

const mediaActions = getSettingActionsFor('media');

function registerRendererEvents(dispatch) {
    ipcRenderer.on('mediaImported', (event, args) => {
        dispatch(mediaImported({items: args}));
        dispatch(mediaActions.updateExtras({data: {options: {items: args}}}));
    });
}

export default registerRendererEvents;
