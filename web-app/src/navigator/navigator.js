import React, {Component} from 'react';
import {connect} from 'react-redux'

import AuthenticationPanel from '../authentication/authentication'
import MediaPanel from '../media/media';
import MediaRemote from '../media-remote/media-remote';
import ChatControls from '../chat-controls/chat-controls';
import actions from './navigation-actions';

import styles from './navigator.module.scss';

import AppView from './app-view';

class Navigator extends Component {
    render() {
        return (
            <div className={styles.navigator}>
                <div className={styles.viewPicker}>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('authentication')
                    }}>Account
                    </div>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('media')
                    }}>Media
                    </div>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('media-remote')
                    }}>Remote
                    </div>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('chat-controls')
                    }}>Chat-Bot
                    </div>
                </div>
                <AppView hidden={this.props.view !== 'authentication'}>
                    <AuthenticationPanel/>
                </AppView>
                <AppView hidden={this.props.view !== 'media-remote'}>
                    <MediaRemote/>
                </AppView>
                <AppView hidden={this.props.view !== 'chat-controls'}>
                    <ChatControls/>
                </AppView>
                <AppView hidden={this.props.view !== 'media'}>
                    <MediaPanel/>
                </AppView>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {...state.navigator};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (destination) => dispatch(actions.navigateTo(destination))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
