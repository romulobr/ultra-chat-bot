const defaultState = {
    items: [],
    loading: true
};

function mediaReducer(state, action) {
    switch (action.type) {
        case 'SAVE_MEDIA' : {
            return {
                ...state,
                loading: true
            }
        }
        case 'MEDIA_VALIDATION_ERRORS' : {
            return {
                ...state,
                loading: false
            }
        }
        case 'MEDIA_SAVED' : {
            console.log(action);
            return {
                items: action.items,
                loading: false
            }
        }
        case 'MEDIA_SAVING_ERROR' : {
            return {
                ...state,
                loading: false
            }
        }
        case 'FETCH_MEDIA ': {
            return {
                loading: true,
                items: action.items
            };
        }
        case 'MEDIA_FETCHED': {
            return {
                loading: false,
                items: action.items
            };
        }
        case 'MEDIA_IMPORTED': {
            return {
                loading: false,
                items: state.items.concat(action.items)
            };
        }
        default:
            return state || defaultState;
    }
}

export default mediaReducer;
