/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import handleMovement from './movement';
import styles from './chicken.module.scss';
import {TimelineLite, Elastic} from "gsap/all";
import chicken1 from './audio/chicken1.mp3';
import chicken2 from './audio/chicken2.mp3';
import chicken3 from './audio/chicken3.mp3';
import chicken4 from './audio/chicken4.mp3';
import chicken5 from './audio/chicken5.mp3';
import chicken6 from './audio/chicken6.mp3';
import chicken7 from './audio/chicken7.mp3';
import chicken8 from './audio/chicken8.mp3';
import chicken9 from './audio/chicken9.mp3';
import chicken10 from './audio/chicken10.mp3';
import chicken11 from './audio/chicken11.mp3';
import chicken12 from './audio/chicken12.mp3';
import chicken13 from './audio/chicken13.mp3';

const chickenAudio = [chicken1, chicken2, chicken3, chicken4, chicken5, chicken6, chicken7, chicken8, chicken9, chicken10, chicken11, chicken12, chicken13];
const tl = new TimelineLite();

class Chicken extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.move && prevProps.moveId !== this.props.moveId) {
            handleMovement(this.chicken.current, {x: this.props.move.x, y: this.props.move.y, autoFlip: true});
            handleMovement(this.speechBubble.current, {x: this.props.move.x, y: this.props.move.y, shiftY: -64});
        }
        if (this.props.say && prevProps.sayId !== this.props.sayId) {
            const bubble = this.speechBubble.current;
            bubble.style.top = this.chicken.current.style.top - 64;
            tl.clear();
            tl.to(bubble, 1, {opacity: 1});
            tl.to(bubble, 2, {text: this.props.say, ease: Elastic.easeOut.config(1, 0.75),});
            tl.to(bubble, 1, {delay: 9, opacity: 0});
            tl.call(() => {
                bubble.innerHTML = '';
            });

            if (this.props.sound) {
                this.audioPlayer.current.src = chickenAudio[Math.floor((Math.random() * (12.99)))];
                this.audioPlayer.current.play();
            }
        }
    }

    constructor(props) {
        super(props);
        this.chicken = React.createRef();
        this.speechBubble = React.createRef();
        this.audioPlayer = React.createRef();
        this.state = {
            moving: false,
            showing: false
        };
    }

    render() {
        return (
            <div>
                <div ref={this.speechBubble} className={styles.chatBubble}>
                </div>
                <div ref={this.chicken} className={styles.chicken}>
                </div>
                <audio ref={this.audioPlayer} className={styles.chicken}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.chicken
    };
}

export default connect(mapStateToProps)(Chicken);
