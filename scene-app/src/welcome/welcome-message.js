import React, {Component} from 'react';
import './welcome.scss';
import {TimelineMax, TweenLite, Power2} from "gsap/all";

class WelcomeMessage extends Component {
    constructor() {
        super();
        this.initialAnimation = this.initialAnimation.bind(this);
        this.messageElementRef = React.createRef();
        this.tl = new TimelineMax({repeat: -1, yoyo: true});
    }

    initialAnimation(messageElement) {

        TweenLite.to(messageElement, 1, {
            opacity: 1,
            ease: Power2.easeIn,
            rotation: '-5deg'
        });
        TweenLite.to(messageElement, 1, {
            opacity: 0,
            delay: this.props.duration || 4,
            ease: Power2.easeOut,
            onComplete: () => {
                this.props.onComplete();
            }
        });
    }

    componentDidMount() {
        const messageElement = this.messageElementRef.current;
        this.initialAnimation(messageElement);
    }

    render() {
        return (
            <div ref={this.messageElementRef} className="welcomeMessages_welcomeMessage">
                <h1>"{this.props.text}"</h1>
                <h2>{this.props.author.name}</h2>
            </div>
        )
    }
}

export default WelcomeMessage;
