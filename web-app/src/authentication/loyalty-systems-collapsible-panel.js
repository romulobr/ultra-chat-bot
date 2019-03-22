import React from 'react'
import {Switch} from '@smooth-ui/core-sc';
import CollapsiblePanel from '../collapsible-panel/collapsible-panel';
import styles from './authentication.module.scss';
import {connect} from "react-redux";
import streamlabsActions from './stream-labs/stream-labs-actions';
import streamElementsActions from './stream-elements/stream-elements-actions';
import {
    Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, Typography, Textarea, Input, FormCheckLabel
} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";

class LoyaltySystemsCollapsiblePanel extends React.Component {

    constructor(props) {
        super(props);
        this.toggleStreamLabsConnection = this.toggleStreamLabsConnection.bind(this);
        this.updateStreamElementsToken = this.updateStreamElementsToken.bind(this);
        this.props.fetchStreamLabsData();
        this.props.fetchStreamElementsToken();
        this.streamElementsTokenRef = new React.createRef();
        this.state = {
            token: '',
            connectedToStreamElements: props.connectedToStreamElements,
            connectedToStreamLabs: props.connectedToStreamLabs
        };
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.data && prevProps.data.token) !== (this.props.data && this.props.data.token)) {
            this.setState({token: this.props.data && this.props.data.token});
        }
    }

    updateStreamElementsToken(e) {
        this.setState({token: e.target.value});
        this.lastIteraction = new Date();
        console.log('token content changed');
        const that = this;
        setTimeout(() => {
            const now = new Date();
            console.log('checking to update token or not', now - that.lastIteraction);
            if (now - that.lastIteraction > 1900) {
                console.log('updating token to', that.state.token);
                that.props.saveStreamElementsToken(that.state.token);
            }
        }, 2000);
    }

    toggleStreamLabsConnection() {
        const isConnected = this.props.connectedToStreamLabs;
        if (isConnected) {
            this.props.disconnectFromStreamLabs();
        } else {
            this.setState({connectedToStreamLabs: false});
            window.open('/streamlabs/authorize', '_blank', 'nodeIntegration=no');
            setTimeout(this.props.fetchStreamLabsData, 1000);
            setTimeout(this.props.fetchStreamLabsData, 3000);
        }
    }

    render() {
        return (
            <CollapsiblePanel title={"Loyalty Services"}>
                <div className={styles.streamService}>
                    <div className={styles.streamServiceImage}
                         style={{backgroundImage: `url(img/stream-labs-logo.png)`}}/>
                    <div>
                        <Switch labeled checked={this.props.connectedToStreamLabs} onChange={() => {
                            this.toggleStreamLabsConnection()
                        }}/>
                    </div>
                    <FormCheckLabel>
                        StreamLabs
                    </FormCheckLabel>
                </div>
                <div className={styles.streamService}>
                    <div className={styles.streamServiceImage}
                         style={{backgroundImage: `url(img/stream-elements.png)`}}/>
                    <div>
                        <Switch disabled labeled checked={this.props.tokenVerified}/>
                    </div>
                    <FormCheckLabel>
                        StreamElements
                    </FormCheckLabel>
                </div>
                <div className={styles.streamElementsTokenLabel}>
                    <Input size="sm"
                           control
                           placeholder="StreamElements Token"
                           ref={this.streamElementsTokenRef}
                           value={this.state.token}
                           onChange={this.updateStreamElementsToken}
                           valid={this.props.tokenVerified}
                    />
                </div>
            </CollapsiblePanel>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.streamLabs,
        ...state.streamElements,
        connectedToStreamLabs: !!state.streamLabs.access_token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        disconnectFromStreamLabs: () => {
            dispatch(streamlabsActions.disconnectStreamlabs());
        },
        fetchStreamLabsData: () => {
            dispatch(streamlabsActions.fetchStreamlabs());
        },
        fetchStreamElementsToken: () => {
            dispatch(streamElementsActions.fetchToken());
        },
        saveStreamElementsToken: (token) => {
            dispatch(streamElementsActions.saveToken({token}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltySystemsCollapsiblePanel);
