import React, {Component} from 'react';
import styles from './youtube-chat-controls.module.scss';
import LoadingSpinner from '../../loading-spinner/loading-spinner';
import {connect} from 'react-redux';
import actions from './youtube-chat-controls-actions';
import chatControlActions from '../chat-control-actions';

class YoutubeChatControl extends Component {

    componentDidMount() {
        this.props.fetchYoutubeBroadcasts();
    }

    render() {
        return (
            <div className={styles.youtubeChatControls}>
                {this.props.loading && (<LoadingSpinner/>)}
                <div className={styles.broadcasts}>
                    {this.props.broadcasts.map(broadcast => (
                        <div key={broadcast.id} className={styles.broadcast}>
                            <img src={broadcast.snippet.thumbnails.medium.url} alt="thumbnail"/>
                            {broadcast.snippet.title}
                            <button onClick={this.props.connectToChat(broadcast.snippet.liveChatId)}>Connect to Chat
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.youtubeChatControls,
        user: state.user && state.user.youtube,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchYoutubeBroadcasts: () => {
            dispatch(actions.fetchYoutubeBroadcasts());
        },
        connectToChat: (liveChatId) => {
            return () => {
                dispatch(chatControlActions.connectToChat(liveChatId))
            };
        },
        disconnectFromChat: () => {
            dispatch(chatControlActions.disconnectFromChat());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YoutubeChatControl);
