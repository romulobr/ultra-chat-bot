import {createAction} from 'redux-act';

const connectToChat = createAction('CONNECT_TO_CHAT');
const disconnectFromChat = createAction('DISCONNECT_FROM_CHAT');
const connectedToChat = createAction('CONNECTED_TO_CHAT');
const disconnectedFromChat = createAction('DISCONNECTED_FROM_CHAT');
const connectToChatFailed = createAction('CONNECT_TO_CHAT_FAILED');

export {connectToChat};
export {disconnectFromChat};
export {connectedToChat};
export {disconnectedFromChat};
export {connectToChatFailed};

export default {
    connectToChat, disconnectFromChat, connectedToChat, disconnectedFromChat, connectToChatFailed
}
