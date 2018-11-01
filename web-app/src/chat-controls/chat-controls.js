import React, {Component} from 'react';
import styles from './chat-controls.module.scss';
import {connect} from 'react-redux';

class ChatControls extends Component {
    render() {
        return (
            <div className={styles.chatControls}>
                <button onClick={this.props.connectToChat} className={styles.button}>
                    Connect to Chat
                </button>
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
