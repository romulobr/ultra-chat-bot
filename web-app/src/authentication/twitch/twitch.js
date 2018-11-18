import React, {Component} from 'react';
import authenticationStyles from '../authentication.module.scss';

class Twitch extends Component {

    constructor() {
        super();
        this.disconnect = this.disconnect.bind(this);
    }

    connect() {
        window.open('/api/auth/twitch/', '_blank', 'nodeIntegration=no');
    }

    disconnect() {
        this.props.onDeathenticate();
    }

    render() {
        return (
            <div>
                <div className={authenticationStyles.accountInformation} style={{
                    backgroundImage: 'url(img/twitch-logo.png)',
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

export default Twitch;
