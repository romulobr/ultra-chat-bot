import actions from './news-actions';
import {createReducer} from 'redux-act';

const initialState = {
    loading: true
};

const newsReducer = createReducer({
        [actions.saveNews]: (state, payload) => ({...state, data: payload, loading: true}),
        [actions.newsSaved]: (state, payload) => ({data: payload, loading: false}),
        [actions.newsSaveFailed]: (state, payload) => ({...state, loading: false, error: payload}),
        [actions.fetchNews]: (state, payload) => ({...state, loading: true}),
        [actions.newsFetched]: (state, payload) => ({...state, data: payload, loading: false})
    }, initialState
);

export default newsReducer;
