import actions from './media-actions';
import {createReducer} from 'redux-act';

const initialState = {
    items: [],
    loading: true
};

const mediaReducer = createReducer({
        [actions.saveMedia]: (state, payload) => ({...state, loading: true}),
        [actions.mediaValidationFailed]: (state, payload) => ({...state, loading: false}),
        [actions.mediaSaved]: (state, payload) => ({items: payload.items, loading: false}),
        [actions.mediaSaveFailed]: (state, payload) => ({...state, loading: false,error:payload}),
        [actions.fetchMedia]: (state, payload) => ({...state, loading: true}),
        [actions.mediaFetched]: (state, payload) => ({items: payload.items, loading: false}),
        [actions.mediaImported]: (state, payload) => {
            debugger;
            return {items: state.items.concat(payload.items), loading: false};
        }
    }, initialState
);

export default mediaReducer;
