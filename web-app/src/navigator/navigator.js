import React, {Component} from 'react';
import {connect} from 'react-redux'

import AuthenticationPanel from '../authentication/authentication'
import MediaPanel from '../media/media';
import MediaRemote from '../media-remote/media-remote';
import ChickenRemote from '../chicken-remote/chicken-remote'
import ChatControls from '../chat-controls/chat-controls';
import actions from './navigation-actions';

import styles from './navigator.module.scss';
import posed, {PoseGroup} from 'react-pose';

const Panel = posed.div({
    enter: {
        opacity: 1,
        transition: {
            y: {type: 'spring', stiffness: 1000, damping: 15},
            default: {duration: 300}
        }
    },
    exit: {
        opacity: 0,
        transition: {duration: 300}
    }
});

class Navigator extends Component {
    render() {
        return (
            <div className={styles.navigator}>
                <div className={styles.viewPicker}>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('authentication')
                    }}>⚙ Settings
                    </div>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('media')
                    }}>📺 Media
                    </div>
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('media-remote')
                    }}>📱 Remote
                    </div>
                    {/*<div className={styles.navigationItem} onClick={() => {*/}
                        {/*this.props.navigateTo('chicken-remote')*/}
                    {/*}}>🐔 Chicken*/}
                    {/*</div>*/}
                    <div className={styles.navigationItem} onClick={() => {
                        this.props.navigateTo('chat-controls')
                    }}>💬 Chat-Bot
                    </div>
                </div>
                <PoseGroup>
                    {this.props.view === 'authentication' && (
                        <Panel key="authentication">
                            <AuthenticationPanel/>
                        </Panel>)}
                    {this.props.view === 'media-remote' && (
                        <Panel key="media-remote">
                            <MediaRemote/>
                        </Panel>)}
                    {this.props.view === 'chat-controls' && (<Panel key="chatControls">
                        <ChatControls/>
                    </Panel>)}
                    {this.props.view === 'media' && (<Panel key="media">
                        <MediaPanel/>
                    </Panel>)}
                    {this.props.view === 'chicken-remote' && (<Panel key="chicken-remote">
                        <ChickenRemote/>
                    </Panel>)}
                </PoseGroup>
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
