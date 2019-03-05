import React, {Component} from 'react';
import styles from './remote-control.module.scss';
import {connect} from 'react-redux';
import actions from './remote-control-actions';
import {Link} from "react-router-dom";
import ChickenControls from '../chicken-remote/chicken-remote';

class MediaRemote extends Component {

    constructor() {
        super();
        this.mediaMessage = this.mediaMessage.bind(this);
        this.playerStyle = {};
    }

    render() {
        return (
            <div className={styles.mediaRemote}>
                {(((!this.props.data || !this.props.data.items)) || (this.props.data.items.length === 0)) && (
                    <div className={styles.instructions}>
                        <h2>How to use</h2>
                        <h3>1. Go to <Link to="media-controls"> media section </Link>(TV)</h3>
                        <h3>2. Click "Copy Files"</h3>
                        <h3>3. Copy your files to the Media Folder (don't use sub-folders)</h3>
                        <h3>4. Click "Import Files"</h3>
                        <h3>5. Click Save</h3>
                        <h3>6. Come Back here</h3>
                    </div>
                )}
                <div>
                    <ChickenControls {...this.props}/>
                </div>
                <div>
                    {this.props.data && this.props.data.items && this.props.data.items.length !== 0 && (
                        <fieldset>
                            <p>Media</p>
                            {this.renderMediaItems(this.props.data.items)}
                        </fieldset>)
                    }
                </div>
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
            cost: item.cost || this.props.data.options.loyalty.defaultCost || 0,
            source: item.sourceOverride || (this.props.data.options.source && this.props.data.options.source.customSource),
            volume: item.volumeOverride || this.props.data.options.defaultVolume || 1,
            author: {name: this.props.userDisplayName}
        };
    }
}

function getName(state) {
    return (state.authentication.user && state.authentication.user.youtube && state.authentication.user.youtube.displayName)
        || (state.authentication.user && state.authentication.user.twitch && state.authentication.user.twitch.displayName)
}

function mapStateToProps(state) {
    return {
        ...state.media,
        userDisplayName: getName(state),
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
