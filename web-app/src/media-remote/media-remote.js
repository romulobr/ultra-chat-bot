import React, {Component} from 'react';
import styles from './media-remote.module.scss';
import {connect} from 'react-redux';
import actions from './media-remote-actions.js';

class MediaRemote extends Component {
    renderMediaItems(items) {
        return items.map((item, index) => {
            return (
                <button className={styles.mediaItem} key={`media-item-${index}`} onClick={() => {
                    this.props.playMedia(item)
                }}>
                    {item.command}
                </button>
            );
        });
    }

    render() {
        return (
            <div className={styles.mediaRemote}>
                {this.renderMediaItems(this.props.items)}
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        ...state.media,
        user: state.users,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playMedia: item => {
            dispatch(actions.playMedia(item));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaRemote);
