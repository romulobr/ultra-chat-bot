const defaultState = {    
    connected:false,
    loading:false
  };
  
  function mediaReducer(state, action) {
    switch (action.type) {
      case 'CONNECT_TO_CHAT' :{
        return {
            connected:false,
            loading:true
        }
      }
      case 'DISCONNECT_FROM_CHAT' :{
        return {
            connected:false,
            loading:true
        }
      }
      case 'CONNECTED_TO_CHAT' :{
        return {
            connected:true,
            loading:false
        }
      }
      case 'DISCONNECTED_FROM_CHAT' :{
        return {
            connected:false,
            loading:false
        }
      }
      case 'CONNECT_TO_CHAT_FAILED' :{
        return {
            connected:false,
            loading:false
        }
      }
      default:
        return state || defaultState;
    }
  }
  
  export default mediaReducer;
