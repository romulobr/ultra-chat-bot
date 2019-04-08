/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import handleMovement from './movement';
import styles from './chicken.module.scss';
import {TimelineLite, Elastic} from "gsap/all";
import chest1 from './audio/chest.mp3';

const gsap = require("gsap");
const textPlugin = require("gsap/TextPlugin");
console.log(gsap, textPlugin);

const chestAudio = [chest1];
const tl = new TimelineLite();

class Chicken extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.show && prevProps.showId !== this.props.moveId) {
            handleMovement(this.chicken.current, {x: this.props.move.x, y: this.props.move.y, autoFlip: true});
            handleMovement(this.speechBubble.current, {
                x: this.props.chest.x,
                y: this.props.move.y,
                shiftY: -64,
                shiftX: 128
            });
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
                this.audioPlayer.current.src = chestAudio[Math.floor((Math.random() * (12.99)))];
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
            <div className="application">
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
