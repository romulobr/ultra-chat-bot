import React, { Component } from 'react';
import './chat-controls.scss';
import { connect } from 'react-redux';

class ChatControls extends Component {
  render() {
    return (
      <div class="chat-controls">
        <h2> Chat Controls</h2>
        <div> <img src="/img/chat.png"/></div>
        <div> Disconnected </div>
        <div> <button class="chat-controls__button">Connect</button> </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      ...state.chat
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      connectToChat: () => {
        dispatch({
          type: 'CONNECT_TO_CHAT'

        });
      },
      disconnectFromChat: () => {
        dispatch({
          type: 'DISCONNECT_FROM_CHAT'
        });
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatControls);
