import React from 'react'
import {Switch, FormCheck, FormCheckLabel} from '@smooth-ui/core-sc';
import CollapsiblePanel from '../collapsible-panel/collapsible-panel';
import styles from './authentication.module.scss';
import {connect} from "react-redux";
import deauthenticate from './deauthentication';
import actions from './authentication-actions';

class AuthenticationCollapsiblePanel extends React.Component {

    constructor(props) {
        super(props);
        this.toggleTwitchConnection = this.toggleTwitchConnection.bind(this);
        this.toggleYoutubeConnection = this.toggleYoutubeConnection.bind(this);
        this.state = {
            connectedToYoutube: props.connectedToYoutube,
            connectedToTwitch: props.connectedToTwitch
        };

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

    componentDidUpdate(prevProps) {
        if (prevProps.connectedToYoutube !== this.props.connectedToYoutube || prevProps.connectedToTwitch !== this.props.connectedToTwitch) {
            this.setState({...this.props});
        }
    }

    toggleTwitchConnection() {
        const isConnected = !!(this.state.user && this.state.user.twitch);
        if (isConnected) {
            this.props.deauthenticateTwitch();
        } else {
            this.setState({connectedToTwitch: false});
            window.open('/api/auth/twitch/', '_blank', 'nodeIntegration=no');
        }
    }

    toggleYoutubeConnection() {
        const isConnected = !!(this.props.user && this.props.user.youtube);
        if (isConnected) {
            this.props.deauthenticateYoutube();
        } else {
            this.setState({connectedToYoutube: false});
            window.open('/api/auth/youtube/', '_blank', 'nodeIntegration=no');
        }
    }

    render() {
        return (
            <CollapsiblePanel title={"Stream services"}>
                <div className={styles.streamService} onClick={() => {
                    this.toggleTwitchConnection();
                }}>
                    <div className={styles.streamServiceImage} style={{backgroundImage: `url(${this.props.user && this.props.user.twitch && this.props.user.twitch.profilePictureUrl})`}}></div>
                    <FormCheck>
                        <Switch labeled checked={this.state.connectedToTwitch}/>
                        <FormCheckLabel>
                            Twitch
                        </FormCheckLabel>
                    </FormCheck>
                </div>
                <div className={styles.streamService} onClick={() => {
                    this.toggleYoutubeConnection();
                }}>
                    <div className={styles.streamServiceImage} style={{backgroundImage: `url(${this.props.user && this.props.user.youtube && this.props.user.youtube.profilePictureUrl})`}}></div>
                    <FormCheck>
                        <Switch labeled checked={this.state.connectedToYoutube}/>
                        <FormCheckLabel>
                            Youtube
                        </FormCheckLabel>
                    </FormCheck>
                </div>
            </CollapsiblePanel>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.authentication,
        connectedToYoutube: state.authentication.user && state.authentication.user.youtube,
        connectedToTwitch: state.authentication.user && state.authentication.user.twitch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deauthenticateYoutube: () => {
            deauthenticate(dispatch, 'youtube');
        },
        deauthenticateTwitch: () => {
            deauthenticate(dispatch, 'twitch');
        },
        authenticate: (currentUser) => {
            dispatch(actions.authentication(currentUser));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationCollapsiblePanel);
