import React, {Component} from 'react';
import './news.scss';
import {TimelineMax, TweenLite, Power2} from "gsap/all";

class newsItem extends Component {
    constructor() {
        super();
        this.initialAnimation = this.initialAnimation.bind(this);
        this.messageElementRef = React.createRef();
        this.tl = new TimelineMax({repeat: -1, yoyo: true});
    }

    initialAnimation(messageElement) {

        TweenLite.to(messageElement, 3, {
            opacity: 1,
            bottom:0,
            ease: Power2.easeIn,
        });
        TweenLite.to(messageElement, 1, {
            opacity: 0,
            bottom:-201,
            delay: this.props.duration || 60,
            ease: Power2.easeOut,
            onComplete: () => {
                console.log('completed');
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
            <div ref={this.messageElementRef} className="newsItems_newsItem">
                <div>
                    <img src={this.props.image}/>
                </div>
                <div>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}

export default newsItem;
