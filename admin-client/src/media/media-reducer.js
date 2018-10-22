const defaultState = {
  items: []
};

function mediaReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEDIA_ITEM': {
      console.log('added media:', action);
      const newItems = state.items.slice(0);
      newItems.push(action.mediaItem);
      return {
        items: newItems
      };
    }
    case 'DELETE_MEDIA_ITEM': {
      console.log('deleted media:', action);
      const newItems = state.items.slice(0, action.mediaIndex);
      Array.prototype.push.apply(
        newItems,
        state.items.slice(action.mediaIndex + 1, state.items.lenght - 1)
      );
      return {
        items: newItems
      };
    }
    case 'MEDIA_FETCHED': {
      console.log('fetched media items:', action.items);
      return {
        items: action.items
      };
    }
    default:
      return state || defaultState;
  }
}

export default mediaReducer;
