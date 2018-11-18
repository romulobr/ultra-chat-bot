import React, {Component} from 'react';
import styles from './chat-controls.module.scss';
import {connect} from 'react-redux';
import YoutubeChatControls from './youtube/youtube-chat-controls';
import actions from './chat-control-actions';
import registerRendererEvents from './chat-controls-message-handlers';

class ChatControls extends Component {
    render() {
        return (
            <div className={styles.chatControls}>
                {this.props.user && this.props.user.origin === 'youtube' && (<YoutubeChatControls/>)}
                {this.props.user && this.props.user.origin === 'twitch' && (
                    <div
                        className={styles.twitchChat + (this.props.connected ? ' ' + styles.connected : '') + (this.props.loading ? ' ' + styles.loading : '')}>
                        <img src="/img/twitch-logo.png" alt="twitch logo"/>
                        <div>Twitch</div>
                        <button
                            onClick={this.props.connected ? this.props.disconnectFromChat : this.props.connectToChat}
                            disabled={this.props.loading}>
                            {this.props.connected ? 'Disconnect' : 'Connect to Chat'}
                        </button>
                    </div>
                )}
            </div>
        );
    }

    componentDidMount() {
        this.props.registerRendererEvents();
    }
}


function mapStateToProps(state) {
    return {
        ...state.chatControls,
        user: state.authentication.user && state.authentication.user.youtube
    };
}

const mapDispatchToProps = dispatch => {
    return {
        connectToChat: () => {
            dispatch(actions.connectToChat());
        },
        disconnectFromChat: () => {
            dispatch(actions.disconnectFromChat());
        },
        registerRendererEvents: () => {
            registerRendererEvents(dispatch)
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatControls);
