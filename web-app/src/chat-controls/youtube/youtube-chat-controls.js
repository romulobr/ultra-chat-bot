import React, {Component} from 'react';
import styles from './youtube-chat-controls.module.scss';
import LoadingSpinner from '../../loading-spinner/loading-spinner';
import {connect} from 'react-redux';
import actions from './youtube-chat-controls-actions';
import chatControlActions from '../chat-control-actions';

class YoutubeChatControl extends Component {
    constructor() {
        super();
        this.isConnected = this.isConnected.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.props.fetchYoutubeBroadcasts();
    }

    isConnected(liveChatId) {
        return this.props.youtube && this.props.youtube[liveChatId] && this.props.youtube[liveChatId].connected;
    }

    isLoading(liveChatId) {
        return this.props.youtube && this.props.youtube[liveChatId] && this.props.youtube[liveChatId].loading;
    }

    render() {
        return (
            <div className={styles.youtubeChatControls}>
                <div className={styles.broadcasts}>
                    {this.props.broadcasts.map(broadcast => (
                        <div key={broadcast.id}
                             className={styles.broadcast + (this.isConnected(broadcast.snippet.liveChatId) ? ' ' + styles.connected : '') + (this.isLoading(broadcast.snippet.liveChatId) ? ' ' + styles.loading : '')}>
                            <img src={broadcast.snippet.thumbnails.medium.url} alt="thumbnail"/>
                            {broadcast.snippet.title}
                            <button
                                disabled={this.isLoading(broadcast.snippet.liveChatId) ? ' ' + styles.loading : ''}
                                onClick={
                                    this.isConnected(broadcast.snippet.liveChatId) ?
                                        this.props.disconnectFromChat(broadcast.snippet.liveChatId) :
                                        this.props.connectToChat(broadcast.snippet.liveChatId)
                                }
                            >{this.isConnected(broadcast.snippet.liveChatId) ?
                                'Disconnect' : 'Connect'}
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
        ...state.chatControls,
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
            return () => dispatch(chatControlActions.connectToChat({'youtube': {liveChatId, loading: true}}));

        },
        disconnectFromChat: (liveChatId) => {
            return () => dispatch(chatControlActions.disconnectFromChat({'youtube': {liveChatId, loading: true}}))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YoutubeChatControl);
