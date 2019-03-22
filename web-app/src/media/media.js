import React, {Component} from 'react';
import styles from './media.module.scss';
import {connect} from 'react-redux';
import registerRendererEvents from './media-message-handlers';
import actions from './media-actions';
import LoadingSpinner from '../loading-spinner/loading-spinner'
import mediaFields from '../settings-panel/field-sets/features/media-fields';
import settingsPanelFor from '../settings-panel/settings-panel';
import {Button} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";

const MediaSettingsPanel = settingsPanelFor('media', mediaFields, ['mediaExtras']);

class MediaPanel extends Component {
    constructor(props) {
        super(props);
        this.props.registerRendererEvents();
    }

    render() {
        return (
            <div className={styles.mediaPanel}>
                {this.props.isLoading && (<LoadingSpinner/>)}
                <div className={styles.mediaPanelButtonsBar}>
                    <Button type="button"
                            variant="dark"
                            onClick={this.props.openMediaFolder}>
                        Copy files
                    </Button>
                    <Button type="button"
                            variant="dark"
                            onClick={this.props.importMedia}>
                        Import files
                    </Button>
                </div>
                <MediaSettingsPanel/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newData = {
        ...state.media.data
    };
    if (state.mediaExtras.items) {
        newData.options = newData.options || {};
        newData.options.items = state.mediaExtras.items;
    }
    return {...state.media, user: state.authentication.user, data: newData};
}

const mapDispatchToProps = dispatch => {
    return {
        importMedia: () => {
            dispatch(actions.importMedia());
        },
        openMediaFolder: () => {
            dispatch(actions.openMediaFolder());
        },
        registerRendererEvents: () => {
            registerRendererEvents(dispatch)
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaPanel);
