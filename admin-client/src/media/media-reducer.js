const defaultState = {
  items: [
    {
      command: 'ai',
      url:
        'https://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v'
    },
    {
      command: 'churrasqueira',
      url:
        'https://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v'
    },
    {
      command: 'fogo',
      url:
        'https://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v'
    },
    {
      command: 'churrasqueira',
      url:
        'https://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v'
    },
    {
      command: 'aiai',
      url:
        'https://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v'
    },
    {
      command: 'aiaiai',
      url:
        'https://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v'
    }
  ]
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
      const newItems = state.items.slice(0,action.mediaIndex);
      Array.prototype.push.apply(newItems,state.items.slice(action.mediaIndex+1,state.items.lenght-1));
      return {
        items: newItems
      };
    }    
    default:
      return state || defaultState;
  }
}

export default mediaReducer;
