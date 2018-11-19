import actions from './chat-control-actions';
import {createReducer} from 'redux-act';

const chatControlsReducer = createReducer({
        [actions.connectToChat]: (state, payload) => {
            if (payload.youtube) {
                const newState = {...state};
                newState.youtube = {...state.youtube, [payload.youtube.liveChatId]: {connected: false, loading: true}};
                return newState
            }
            return {...state, ...payload};
        },
        [actions.disconnectFromChat]: (state, payload) => {
            if (payload.youtube) {
                const newState = {...state};
                newState.youtube = {...state.youtube, [payload.youtube.liveChatId]: {connected: true, loading: true}};
                return newState
            }
            return {...state, ...payload};
        },
        [actions.connectedToChat]: (state, payload) => {
            if (payload.youtube) {
                const newState = {...state};
                newState.youtube = {...state.youtube, ...payload.youtube};
                return newState
            }
            return {...state, ...payload}
        },
        [actions.disconnectedFromChat]: (state, payload) => {
            if (payload.youtube) {
                const newState = {...state};
                newState.youtube = {...state.youtube, [payload.youtube.liveChatId]: {connected: false, loading: false}};
                return newState
            }
            return {...state, ...payload};
        },
        [actions.connectToChatFailed]: (state, payload) => ({...state, ...payload}),
    }, {twitch: {}, youtube: {}}
);

export default chatControlsReducer;
