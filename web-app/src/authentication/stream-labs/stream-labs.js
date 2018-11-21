import React, {Component} from 'react';
import styles from './stream-labs.module.scss';
import authenticationStyles from '../authentication.module.scss';
import posed from 'react-pose';
import actions from './stream-labs-actions';
import {connect} from 'react-redux';

class Streamlabs extends Component {
    constructor(props) {
        super(props);
        this.state = {...props};
        props.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    connect() {
        window.open('/streamlabs/authorize', '_blank', 'nodeIntegration=no');
    }

    render() {
        return (
            <div>
                <div className={authenticationStyles.accountInformation} style={{
                    backgroundImage: 'url(img/stream-labs-logo.png)',
                    filter: this.props.access_token ? '' : 'grayscale(100%)'
                }}>
                    <div className={styles.token}>
                        {!this.props.user ? 'Not available' :
                            this.props.isLoading ? 'Loading...' : (this.props.user) || (this.props.access_token ? 'Ready' : 'Not connected')}
                    </div>
                </div>
                <div>
                    {!this.props.isEditing && (
                        <button disabled={this.props.isLoading}
                                onClick={this.props.access_token && this.props.access_token !== '' ? this.props.disconnect : this.connect}>
                            {this.props.access_token && this.props.access_token !== '' ? 'Disconnect' : 'Connect'}
                        </button>
                    )}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        ...state.streamLabs
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => {
            dispatch(actions.fetchStreamlabs());
        },
        disconnect: () => {
            dispatch(actions.disconnectStreamlabs());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Streamlabs);
