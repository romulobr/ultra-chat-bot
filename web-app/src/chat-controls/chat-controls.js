import React, { Component } from 'react';
import styles from './chat-controls.module.scss';
import { connect } from 'react-redux';

class ChatControls extends Component {
  render() {
    return (
      <div className={styles.chatControls}>
        <div> <button onClick={this.props.connectToChat} className="chat-controls__button"><img src="/img/chat.png" alt="chat icon"/> Connect</button> </div>
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
