import React, { Component } from 'react';
import './authentication.scss';
import deauthenticate from './deauthentication';
import { connect } from 'react-redux';

class AuthenticationPanel extends Component {
  componentDidMount() {
    this.props.authenticate();
  }
  getLoadingClassName(props) {
    return props.loading
      ? 'welcome-panel__status-bar'
      : 'welcome-panel__status-bar welcome-panel__status-bar__hidden'
  }
  getConnectedClassName(props) {
    return props.connected
      ? `welcome-panel__status-bar welcome-panel__status-bar__${props.user.origin}`
      : 'welcome-panel__status-bar welcome-panel__status-bar__hidden';
  }
  getDisconnectedClassName(props) {
    return !props.connected && !props.loading
      ? 'welcome-panel__status-bar'
      : 'welcome-panel__status-bar welcome-panel__status-bar__hidden';
  }
  getImageDivStyle(props) {
    return props.user
      ? { backgroundImage: `url(${props.user.profilePictureUrl})` }
      : {};
  }
  render() {
    return (
      <div className="welcome-panel">
        <div className={this.getLoadingClassName(this.props)}>
          <div
            className={'welcome-panel__status-bar__disconnected-information'}
          >
            Checking connection...
          </div>
        </div>
        <div className={this.getDisconnectedClassName(this.props)}>
          <div
            className={'welcome-panel__status-bar__disconnected-information'}
          >
            You are not connected yet
          </div>
          <div
            className={'welcome-panel__status-bar__disconnected-information'}
          >
            <a href="/auth/twitch">Connect with twitch</a>
          </div>
          <div
            className={'welcome-panel__status-bar__disconnected-information'}
          >
            <a href="/auth/youtube">Connect with youtube</a>
          </div>
        </div>
        <div className={this.getConnectedClassName(this.props)}>
          <div
            className={'welcome-panel__status-bar__profile-picture'}
            style={this.getImageDivStyle(this.props)}
          />
          <div className={'welcome-panel__status-bar__origin '}>
            {this.props.hasUser && this.props.user.origin}
          </div>
          <div className="welcome-panel__status-bar__name">
            {this.props.hasUser && this.props.user.displayName}
          </div>
          <div>
            <button onClick={this.props.deauthenticate}>Disconnect</button>
          </div>
        </div>
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
      dispatch({ type: 'AUTHENTICATION' });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationPanel);
