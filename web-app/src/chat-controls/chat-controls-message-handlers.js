import {connectedToChat, connectToChatFailed, disconnectedFromChat} from './chat-control-actions'
import {ipcRenderer} from 'electron';

function registerRendererEvents(dispatch) {
    ipcRenderer.on('connectedToChat', (event, options) => {
        setTimeout(() => {
            if (options.origin === 'twitch') {
                dispatch(connectedToChat({'twitch': {...options, connected: true, loading: false}}));
            } else {
                dispatch(connectedToChat({'youtube': {[options.liveChatId]: {connected: true, loading: false}}}));
            }
        }, 2000);
    });

    ipcRenderer.on('connectToChatFailed', (event, options) => {
        setTimeout(() => {
            dispatch(connectToChatFailed({[options.origin]: {...options, connected: false, loading: false}}));
        }, 2000);
    });

    ipcRenderer.on('disconnectedFromChat', (event, options) => {
        setTimeout(() => {
            dispatch(disconnectedFromChat({[options.origin]: {...options, connected: false, loading: false}}));
        }, 2000);
    });
}

export default registerRendererEvents;
