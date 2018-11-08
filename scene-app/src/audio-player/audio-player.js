import React, {Component} from 'react';
import {connect} from 'react-redux';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
        this.state = {playing: false};
    }

    componentDidMount() {
        const audioNode = this.audioRef.current;
        const that = this;
        audioNode.onended = function () {
            audioNode.src = '';
            that.setState({playing: false})
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.audio !== this.props.audio) {
            const audioNode = this.audioRef.current;
            if (audioNode.src === this.props.audio) {
                audioNode.currentTime = 0;
                audioNode.play();
                this.setState({playing: true})
            } else {
                audioNode.src = this.props.audio;
                audioNode.play();
                this.setState({playing: true})
            }
        }
    }

    render() {
        return (
            <div>
                <audio ref={this.audioRef}/>
            </div>)
    }

}

function mapStateToProps(state) {
    return {
        ...state.audioPlayer
    };
}

export default connect(mapStateToProps)(AudioPlayer);
