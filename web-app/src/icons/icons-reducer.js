import actions from './icons-actions';
import {createReducer} from 'redux-act';

const initialState = {
    loading: true
};

const iconsReducer = createReducer({
        [actions.saveIcons]: (state, payload) => ({...state, data: payload, loading: true}),
        [actions.iconsSaved]: (state, payload) => ({data: payload, loading: false}),
        [actions.iconsSaveFailed]: (state, payload) => ({...state, loading: false, error: payload}),
        [actions.fetchIcons]: (state, payload) => ({...state, loading: true}),
        [actions.iconsFetched]: (state, payload) => ({...state, data: payload, loading: false})
    }, initialState
);

export default iconsReducer;
