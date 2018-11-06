import actions from './chat-control-actions';
import {createReducer} from 'redux-act';

const initialState = {
    connected: false,
    loading: false
};

const chatControlsReducer = createReducer({
        [actions.connectToChat]: (state, payload) => ({connected: false, loading: true}),
        [actions.disconnectFromChat]: (state, payload) => ({connected: true, loading: true}),
        [actions.connectedToChat]: (state, payload) => ({connected: true, loading: false}),
        [actions.disconnectedFromChat]: (state, payload) => ({connected: false, loading: false}),
        [actions.connectToChatFailed]: (state, payload) => ({connected: false, loading: false}),
    }, initialState
);

export default chatControlsReducer;
