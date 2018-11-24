import actions from './media-actions';
import {createReducer} from 'redux-act';

const initialState = {
    loading: true
};

const mediaReducer = createReducer({
        [actions.saveMedia]: (state, payload) => ({...state, data:payload, loading: true}),
        [actions.mediaValidationFailed]: (state, payload) => ({...state, loading: false}),
        [actions.mediaSaved]: (state, payload) => ({data: payload, loading: false}),
        [actions.mediaSaveFailed]: (state, payload) => ({...state, loading: false, error: payload}),
        [actions.fetchMedia]: (state, payload) => ({...state, loading: true}),
        [actions.mediaFetched]: (state, payload) => ({...state, data: payload, loading: false}),
        [actions.mediaImported]: (state, payload) => ({...state, items: payload.items, loading: false})
    }, initialState
);

export default mediaReducer;
