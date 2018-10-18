import React, { Component } from 'react';
import './welcome.scss';
import authentication from './authentication-saga';
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
						<img src={this.props.user.profile.profile_image_url} alt="twitch profile"/>
						<p>Welcome, you are connected to twitch as {this.props.user.profile.display_name} </p>
						<button>Disconnect</button>
					</div>
				) : (
					<div>
						<p>You are not connected to twitch yet</p>
						<a href="/auth/twitch">Connect</a>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state, authentication };
}

export default connect(mapStateToProps)(WelcomePanel);
