import React, {Component} from 'react';
import styles from './authentication.module.scss';
import posed, {PoseGroup} from 'react-pose';
import deauthenticate from './deauthentication';
import actions from './authentication-actions';
import StreamElements from './stream-elements/stream-elements';
import {connect} from 'react-redux';

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
        this.poolToken = this.poolToken.bind(this);
    }

    componentDidMount() {
        this.props.authenticate();
    }

    poolToken(callBack) {
        setTimeout(() => {
            this.props.authenticate();
            if (!this.props.connected) {
                this.poolToken(callBack)
            } else {
                callBack();
            }
        }, 1000)
    }

    render() {
        const myPanel = this.props.connected ?
            (<Panel initialPose={'hidden'} key="connected-panel">
                <div className={styles.information}>
                    <div>
                        <div className={styles.accountInformation}
                             style={this.props.user && {backgroundImage: `url(${this.props.user.profilePictureUrl})`}}>
                            <div className={styles.userName}>
                                {this.props.hasUser && this.props.user.displayName}
                            </div>
                        </div>
                        <div>
                            <button onClick={this.props.deauthenticate}>Disconnect</button>
                        </div>
                    </div>
                    <StreamElements isEditing={this.props.isEditing} token={this.props.token} editToken={this.props.editToken}/>
                </div>
            </Panel>) :
            (<Panel className={styles.information + ' ' + styles.offline} key="disconnected-panel">
                <div>Welcome - You are not connected yet</div>
                <div>
                    <button onClick={() => {
                        const authWindow = window.open('/api/auth/twitch', '_blank', 'nodeIntegration=no');
                        this.poolToken(() => {
                            authWindow.close();
                        })
                    }}>Connect with twitch
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        const authWindow = window.open('/api/auth/youtube', '_blank', 'nodeIntegration=no', "width=200, height=100");
                        debugger;
                        console.log(authWindow);
                    }}>Connect with youtube
                    </button>
                </div>
            </Panel>);

        return (
            <div className={styles.welcomePanel}>
                <PoseGroup>
                    {myPanel}
                </PoseGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.authentication,
        hasUser: !!state.authentication.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deauthenticate: () => {
            deauthenticate(dispatch);
        },
        authenticate: () => {
            dispatch(actions.authentication());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationPanel);
