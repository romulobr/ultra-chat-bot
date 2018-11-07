import {connectedToChat, connectToChatFailed, disconnectedFromChat} from './chat-control-actions'
import {ipcRenderer} from 'electron';

function registerRendererEvents(dispatch) {
    ipcRenderer.on('connectedToChat', () => {
        setTimeout(() => {
            dispatch(connectedToChat());
        }, 2000);
    });

    ipcRenderer.on('connectToChatFailed', () => {
        setTimeout(() => {
            dispatch(connectToChatFailed());
        }, 2000);
    });

    ipcRenderer.on('disconnectedFromChat', () => {
        setTimeout(() => {
            dispatch(disconnectedFromChat());
        }, 2000);
    });
}

export default registerRendererEvents;
