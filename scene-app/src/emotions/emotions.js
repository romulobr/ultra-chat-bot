import React, {Component} from 'react';
import {connect} from 'react-redux';
import './emotions.scss';
import Emotion from './emotion';

import admiration from './icons/admiration-colored.png';
import amazement from './icons/amazement-colored.png';
import grief from './icons/grief-colored.png';
import ecstasy from './icons/ecstasy-colored.png';
import loathing from './icons/loathing-colored.png';
import love from './icons/love-colored.png';
import rage from './icons/rage-colored.png';
import terror from './icons/terror-colored.png';
import vigilance from './icons/vigilance-colored.png';

const emotionIcons = {admiration, terror, amazement, grief, loathing, rage, vigilance, ecstasy, love};

class Emotions extends Component {

    constructor() {
        super();
        this.deleteEmotion = this.deleteEmotion.bind(this);

        this.state = {emotions: []};
    }

    deleteEmotion(emotion) {
        const newEmotions = [].concat(this.state.emotions);
        const index = newEmotions.indexOf(emotion);
        newEmotions.splice(index, 1);
        this.setState({...this.state, emotions: newEmotions});
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            const newEmotions = [].concat(this.state.emotions);
            this.props.emotions.forEach(emotion => {
                const newEmotion = {
                    icon: emotionIcons[emotion],
                    key: 'emotion-' + this.props.id,
                    bottom: (Math.random() * (window.innerHeight - 200)) + 200,
                    left: Math.random() * window.innerWidth,
                };
                newEmotion.onComplete = () => {
                    console.log('deleting emotion ', this.props.id);
                    this.deleteEmotion(this.state.emotions[newEmotion])
                };
                newEmotions.push(newEmotion)
            });
            this.setState({...this.state, emotions: newEmotions});
        }
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
