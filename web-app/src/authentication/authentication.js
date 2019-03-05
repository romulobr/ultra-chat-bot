import React, {Component} from 'react';
import styles from './authentication.module.scss';
import posed, {PoseGroup} from 'react-pose';
import deauthenticate from './deauthentication';
import actions from './authentication-actions';
import StreamElements from './stream-elements/stream-elements';
import Streamlabs from './stream-labs/stream-labs';
import Twitch from './twitch/twitch';
import Youtube from './youtube/youtube';
import {connect} from 'react-redux';
import ChatControls from '../chat-controls/chat-controls'
import CurrentVersion from '../current-version/current-version';

const Panel = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
            y: {type: 'spring', stiffness: 1000, damping: 15},
            default: {duration: 300}
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: {duration: 150}
    }
});

class AuthenticationPanel extends Component {
    constructor() {
        super();
        window.addEventListener("message", (event) => {
            if (event.data === 'authenticated') {
                event.source.close();
                this.props.authenticate(this.props.user);
            }
        }, false);
    }

    componentDidMount() {
        this.props.authenticate(this.props.user);
    }

    render() {
        const myPanel =
            <Panel initialPose={'hidden'} key="connected-panel">
                <div className={styles.information}>
                    <Twitch user={this.props.user && this.props.user.twitch}
                            onDeathenticate={this.props.deauthenticate('twitch')}/>
                    <Youtube user={this.props.user && this.props.user.youtube}
                             onDeathenticate={this.props.deauthenticate('youtube')}/>

                    <StreamElements isEditing={this.props.isEditing}
                                    token={this.props.token}
                                    editToken={this.props.editToken}/>
                    <Streamlabs ref={this.streamlabs}/>
                </div>
                <ChatControls/>
                <div className={styles.overlayInstructions}>
                    <ul>
                        Your browser sources
                        <li>http://localhost:62619/scene</li>
                        {this.props.detectedSources.map((source, i) => {
                            return (<li key={i}>http://localhost:62619/scene?source={source} </li>)
                        })}
                    </ul>
                </div>
                <CurrentVersion/>
            </Panel>;

        return (
            <div className={styles.welcomePanel}>
                <PoseGroup>
                    {myPanel}
                </PoseGroup>
            </div>
        );
    }
}

function getDetectedSources(state) {
    const sources = [];
    Object.keys(state).forEach(key => {
        const source = state[key].data && state[key].data.options && state[key].data.options.source && state[key].data.options.source.customSource;
        source && sources.push(state[key].data.options.source.customSource);
    });
    return sources;
}

function mapStateToProps(state) {
    return {
        ...state.authentication,
        hasUser: !!state.authentication.user,
        detectedSources: getDetectedSources(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deauthenticate: () => {
            return (origin) => deauthenticate(dispatch, origin);
        },
        authenticate: (currentUser) => {
            dispatch(actions.authentication(currentUser));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationPanel);
