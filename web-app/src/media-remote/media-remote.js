import React, {Component} from 'react';
import styles from './media-remote.module.scss';
import {connect} from 'react-redux';
import actions from './media-remote-actions.js';

class MediaRemote extends Component {

    constructor() {
        super();
        this.mediaMessage = this.mediaMessage.bind(this);
        this.playerStyle = {};
    }

    render() {
        return (
            <div className={styles.mediaRemote}>
                {this.renderMediaItems(this.props.items)}
            </div>)
    }

    renderMediaItems(items) {
        return items.map((item, index) => {
            return (
                <button className={styles.mediaItem} key={`media-item-${index}`} onClick={() => {
                    this.props.playMedia(this.mediaMessage(item))
                }}>
                    {item.command}
                </button>
            );
        });
    }

    mediaMessage(item) {
        return {
            ...item, isMedia: true,
            videoLeft: this.props.videoLeft,
            videoWidth: this.props.videoWidth,
            videoTop: this.props.videoTop,
            author: {name: this.props.userDisplayName}
        };
    }
}

function mapStateToProps(state) {
    return {
        ...state.media,
        userDisplayName: state.authentication.user && state.authentication.user.displayName,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playMedia: itemWithOptions => {
            dispatch(actions.playMedia(itemWithOptions));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaRemote);
