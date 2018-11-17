import React, {Component} from 'react';
import {connect} from 'react-redux';
import './emotions.scss';
import Emotion from './emotion';

import admiration from './icons/admiration-colored.png';
import amazement from './icons/amazement-colored.png';
import grief from './icons/grief-colored.png';
import joy from './icons/grief-colored.png';
import loathing from './icons/loathing-colored.png';
import love from './icons/love-colored.png';
import rage from './icons/rage-colored.png';
import terror from './icons/terror-colored.png';
import vigilance from './icons/vigilance-colored.png';

const emotionIcons = [admiration, amazement, grief, joy, loathing, love, rage, terror, vigilance];

class Emotions extends Component {

    constructor() {
        super();
        this.deleteEmotion = this.deleteEmotion.bind(this);

        this.state = {emotions: []};
        for (let i = 0; i < 50; i++) {
            this.state.emotions.push({
                icon: emotionIcons[Math.floor(Math.random() * Math.floor(9))],
                key: 'emotion' + i,
                bottom: Math.random() * 720,
                left: Math.random() * 1280,
                onComplete: () => {
                    console.log('deleting emotion ', i);
                    this.deleteEmotion(this.state.emotions[i])
                }
            });
        }
    }

    deleteEmotion(emotion) {
        const newEmotions = [].concat(this.state.emotions);
        const index = newEmotions.indexOf(emotion);
        newEmotions.splice(index, 1);
        this.setState({emotions: newEmotions});
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    renderEmotions() {
        return this.state.emotions.map((emotion) =>
            (<Emotion icon={emotion.icon}
                      key={emotion.key}
                      bottom={emotion.bottom}
                      left={emotion.left}
                      onComplete={emotion.onComplete}
                />
            )
        )
    }

    render() {
        return (
            <div className="application emotions">
                {this.renderEmotions()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.emotions
    };
}

export default connect(mapStateToProps)(Emotions);
