import React, {Component} from 'react';
import styles from './chat-controls.module.scss';
import {connect} from 'react-redux';
import YoutubeChatControls from './youtube/youtube-chat-controls';
import actions from './chat-control-actions';

class ChatControls extends Component {
    render() {
        return (
            <div className={styles.chatControls}>
                {this.props.user && this.props.user.origin === 'youtube' && (<YoutubeChatControls/>)}
                {this.props.user && this.props.user.origin === 'twitch' && (
                    <button onClick={this.props.connectToChat} className={styles.button}>
                        Connect to Chat
                    </button>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.chat,
        user: state.authentication.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        connectToChat: () => {
            dispatch(actions.connectToChat());
        },
        disconnectFromChat: () => {
            dispatch(actions.disconnectFromChat());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatControls);
