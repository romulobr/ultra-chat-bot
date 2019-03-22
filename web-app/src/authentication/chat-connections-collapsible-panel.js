import React from 'react'
import CollapsiblePanel from '../collapsible-panel/collapsible-panel';
import {connect} from "react-redux";
import deauthenticate from './deauthentication';
import actions from './authentication-actions';
import ChatControls from '../chat-controls/chat-controls';

class ChatConnectionsCollapsiblePanel extends React.Component {

    constructor(props) {
        super(props);

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


    render() {
        return (
            <CollapsiblePanel title={"Chat Connections"}>
                <ChatControls/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatConnectionsCollapsiblePanel);
