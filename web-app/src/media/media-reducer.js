import actions from './media-actions';
import {createReducer} from 'redux-act';

const initialState = {
    loading: true
};

const mediaReducer = createReducer({
        [actions.fetchMedia]: (state, payload) => ({...state, loading: true}),
        [actions.mediaImported]: (state, payload) => {
            return {data: {options: {...payload}}};
        }
    }, initialState
);

export default mediaReducer;
