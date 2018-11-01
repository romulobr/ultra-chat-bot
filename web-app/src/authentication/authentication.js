import React, {Component} from 'react';
import styles from './authentication.module.scss';
import posed, {PoseGroup} from 'react-pose';
import getSavedToken from './jwt';
import deauthenticate from './deauthentication';
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
    constructor(){
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
            (<Panel className={styles.information} initialPose={'hidden'} key="connected-panel">
                <div className={styles.profilePicture}
                     style={this.props.user && {backgroundImage: `url(${this.props.user.profilePictureUrl})`}}/>
                <div>
                    Welcome back - You are connected as
                </div>
                <div>
                    {this.props.hasUser && this.props.user.displayName}
                    from {this.props.hasUser && this.props.user.origin}
                </div>
                <div>
                    <button onClick={this.props.deauthenticate}>Disconnect</button>
                </div>
            </Panel>) :
            (<Panel className={styles.information} key="disconnected-panel">
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
            dispatch({type: 'AUTHENTICATION'});
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticationPanel);
