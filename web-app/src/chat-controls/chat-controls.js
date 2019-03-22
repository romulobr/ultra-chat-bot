import React, {Component} from 'react';
import styles from './chat-controls.module.scss';
import {connect} from 'react-redux';
import YoutubeChatControls from './youtube/youtube-chat-controls';
import actions from './chat-control-actions';
import registerRendererEvents from './chat-controls-message-handlers';
import {Button, FormCheckLabel, Switch} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";

class ChatControls extends Component {
    render() {
        return (
            <>
            {this.props.user && this.props.user.twitch && (
                <div
                    className={styles.twitchChat + (this.props.twitch.connected ? ' ' + styles.connected : '') + (this.props.twitch.loading ? ' ' + styles.loading : '')}>
                    <img src={this.props.user.twitch.profilePictureUrl} alt="twitch channel art"/>

                    <Switch labeled checked={this.props.twitch.connected}
                            onClick={this.props.twitch.connected ? this.props.disconnectFromChat : this.props.connectToChat}
                            disabled={this.props.twitch.loading}
                    />
                    <FormCheckLabel>
                        <a href={`https://www.twitch.tv/popout/${this.props.user.twitch.name}/chat?popout=`}
                           target="__blank">Twitch Chat</a>
                    </FormCheckLabel>
                </div>
            )}
            {this.props.user && this.props.user.youtube && (<YoutubeChatControls/>)}
            </>
        );
    }

    componentDidMount() {
        this.props.registerRendererEvents();
    }
}

function mapStateToProps(state) {
    return {
        ...state.chatControls,
        user: state.authentication.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        connectToChat: () => {
            dispatch(actions.connectToChat({'twitch': {loading: true}}));
        },
        disconnectFromChat: () => {
            dispatch(actions.disconnectFromChat({'twitch': {loading: true}}));
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
