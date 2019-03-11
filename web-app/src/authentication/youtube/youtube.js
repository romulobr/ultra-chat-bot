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
                <div>
                    <button
                        disabled={this.props.isLoading}
                        onClick={this.props.user ? this.disconnect : this.connect}
                        className={this.props.user ? 'button-danger' : 'button-important'}
                    >
                        {this.props.user ? 'Disconnect YouTube Account' : 'Connect YouTube Account'}
                    </button>
                </div>
            </div>)
    };
}

export default youtube;
