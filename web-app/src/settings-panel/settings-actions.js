import {createAction} from 'redux-act';

let actions = {};

function getSettingActionsFor(key) {
    if (!actions[key]) {
        actions[key] = {
            save: createAction('SAVE_' + key.toUpperCase()),
            saved: createAction('SAVED_' + key.toUpperCase()),
            fetch: createAction('FETCH_' + key.toUpperCase()),
            fetched: createAction('FETCHED_' + key.toUpperCase()),
            error: createAction('ERROR_' + key.toUpperCase())
        };
    }
    return actions[key];
}

export default getSettingActionsFor;
