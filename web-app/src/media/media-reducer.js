const defaultState = {
  items: [],
  loading:true
};

function mediaReducer(state, action) {
  switch (action.type) {
    case 'SAVE_MEDIA' :{
      return {
        ...state,
        loading: true
      }
    }
    case 'MEDIA_VALIDATION_ERRORS' :{
      return {
        ...state,
        loading: false
      }
    }
    case 'MEDIA_SAVED' :{
      return {
        ...state,
        loading: false
      }
    }
    case 'MEDIA_SAVING_ERROR' :{
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
    default:
      return state || defaultState;
  }
}

export default mediaReducer;
