import actions from './youtube-chat-controls-actions';
import {createReducer} from 'redux-act';

const initialState = {
    broadcasts: [],
    loading: true
};

const youtubeChatControlsReducer = createReducer({
        [actions.fetchYoutubeBroadcasts]: (state) => ({...state, loading: true}),
        [actions.fetchYoutubeBroadcastsSuccess]: (state, payload) => ({...state, loading: false,broadcasts:payload}),
        [actions.fetchYoutubeBroadcastsFailed]: (state, payload) => ({...state, loading: false, error: payload})

    }, initialState
);

export default youtubeChatControlsReducer;
