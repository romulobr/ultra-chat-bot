import React, {Component} from 'react';
import {connect} from 'react-redux';
import './welcome.scss';
import WelcomeMessage from './welcome-message';

class WelcomeMessages extends Component {

    constructor() {
        super();
        this.deleteWelcomeMessage = this.deleteWelcomeMessage.bind(this);
        this.state = {welcomeMessages: []};
    }

    deleteWelcomeMessage(welcomeMessage) {
        const newWelcomeMessages = [].concat(this.state.welcomeMessages);
        const index = newWelcomeMessages.indexOf(welcomeMessage);
        if (index !== -1) {
            newWelcomeMessages.splice(index, 1);
        }
        this.setState({welcomeMessages: newWelcomeMessages});
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            const newWelcomeMessages = [].concat(this.state.welcomeMessages);

            const newWelcomeMessage = {
                text: this.props.message,
                author: this.props.author,
                key: 'welcomeMessage-' + this.props.id,
                bottom: (Math.random() * (window.innerHeight - 200)) + 200,
                left: Math.random() * (window.innerWidth - 600),
            };
            newWelcomeMessage.onComplete = () => {
                console.log('deleting welcomeMessage ', this.props.id);
                this.deleteWelcomeMessage(newWelcomeMessage)
            };
            newWelcomeMessages.push(newWelcomeMessage);

            this.setState({welcomeMessages: newWelcomeMessages});
        }
    }

    renderWelcomeMessages() {
        return this.state.welcomeMessages.map((welcomeMessage) =>
            (<WelcomeMessage text={welcomeMessage.text}
                             author={welcomeMessage.author}
                             key={welcomeMessage.key}
                             onComplete={welcomeMessage.onComplete}
                />
            )
        )
    }

    render() {
        return (
            <div className="application welcomeMessages">
                {this.renderWelcomeMessages()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.welcomeMessages
    };
}

export default connect(mapStateToProps)(WelcomeMessages);
