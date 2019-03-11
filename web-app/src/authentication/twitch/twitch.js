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
                <div>
                    <button
                        disabled={this.props.isLoading}
                        onClick={this.props.user ? this.disconnect : this.connect}
                        className={this.props.user ? 'button-danger' : 'button-important'}
                    >
                        {this.props.user ? 'Disconnect Twitch Account' : 'Connect Twitch Account'}
                    </button>
                </div>
            </div>)
    };
}

export default Twitch;
