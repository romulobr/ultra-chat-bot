import React, {Component} from 'react';
import authenticationStyles from '../authentication.module.scss';

class youtube extends Component {

    constructor() {
        super();
        this.disconnect = this.disconnect.bind(this);
    }

    connect() {
        window.open('/api/auth/youtube/', '_blank', 'nodeIntegration=no');
    }

    disconnect() {
        this.props.onDeathenticate();
    }

    render() {
        return (
            <div>
                <div className={authenticationStyles.accountInformation} style={{
                    backgroundImage: 'url(img/youtube-logo.png)',
                    filter: this.props.user ? '' : 'grayscale(100%)'
                }}>
                    <div>
                        {this.props.isLoading ? 'Loading...' : (this.props.user ? this.props.displayName : 'Not Connected')}
                    </div>
                </div>
                <div>
                    <button
                        disabled={this.props.isLoading}
                        onClick={this.props.user ? this.disconnect : this.connect}
                        className={this.props.user ? 'button-danger' : 'button-important'}
                    >
                        {this.props.user ? 'Disconnect' : 'Connect'}
                    </button>
                </div>
            </div>)
    };
}

export default youtube;
