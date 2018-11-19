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
                {this.props.items.length === 0 && (
                    <div>
                        <p>Looks like you have not imported any Media.</p>
                        <h1>How to use media player</h1>
                        <h2>1. Go to media (TV)</h2>
                        <h2>2. Click Open Media Folder</h2>
                        <h2>3. Copy your media files to Media Folder (no subfolders)</h2>
                        <h2>4. Click Import Media</h2>
                        <h2>5. Click Save</h2>
                        <h2>6. Come Back here</h2>
                    </div>

                )}
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
