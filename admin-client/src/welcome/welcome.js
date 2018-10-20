import React, { Component } from 'react';
import './welcome.scss';
import authentication from './authentication-saga';
import deauthenticate from './deauthentication';
import { connect } from 'react-redux';

class WelcomePanel extends Component {
	componentDidMount() {
		this.props.authentication();
	}
	render() {
		return (
			<div className="welcome-panel">
				<header>
					<h1>Welcome to V3</h1>
				</header>
				{this.props.connected ? (
					<div>
						<img src={this.props.user.profilePictureUrl} alt="twitch profile"/>
						<p>Welcome, you are connected to {this.props.user.origin} as {this.props.user.displayName} </p>
						<button onClick={this.props.deauthenticate}>Disconnect</button>
					</div>
				) : (
					<div>
						<p>You are not connected yet</p>
						<p><a href="/auth/twitch">Connect with twitch</a></p>
						<p><a href="/auth/youtube">Connect with youtube</a></p>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state, authentication, deauthenticate };
}

const mapDispatchToProps = (dispatch) => {
	return ({deauthenticate: ()=>{deauthenticate(dispatch)}});
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePanel);
