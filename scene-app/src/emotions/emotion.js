import React, {Component} from 'react';
import './emotions.scss';
import {TimelineMax, TweenLite, Elastic, Bounce} from "gsap/all";

class Emotion extends Component {
    constructor() {
        super();
        this.initialAnimation = this.initialAnimation.bind(this);
        this.emotionRef = React.createRef();
        this.tl = new TimelineMax({repeat: -1, yoyo: true});
    }

    initialAnimation(emotion) {
        this.tl.to(emotion, 1, {rotation: Math.random() * -30, scale: 0.9}, 0);
        TweenLite.to(emotion, 30, {
            opacity: 0.90,
            y: -1 * this.props.bottom,
            ease: Elastic.easeOut.config(1, 0.3),
        });
        TweenLite.to(emotion, 1.5, {
            opacity: 1,
            delay: 30,
            y: 0,
            ease: Bounce.easeOut,
            onComplete: () => {
                this.props.onComplete();
            }
        });
    }

    componentDidMount() {
        const emotion = this.emotionRef.current;
        this.initialAnimation(emotion);
    }

    render() {
        return (
            <div ref={this.emotionRef} className="emotions_emotion"
                 style={
                     {
                         backgroundImage: `url(${this.props.icon})`,
                         left: this.props.left + 'px',
                         bottom: -100 + 'px'
                     }
                 }>
            </div>
        )
    }
}

export default (Emotion);
