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
        if (prevProps.id !== this.props.id) {
            const audioNode = this.audioRef.current;
            if (audioNode.src === this.props.url) {
                audioNode.currentTime = 0;
                audioNode.volume = this.props.volume || 1;
                audioNode.play();
                this.setState({playing: true})
            } else {
                audioNode.src = this.props.url;
                audioNode.volume = this.props.volume || 1;
                audioNode.play();
                this.setState({playing: true})
            }
        }
    }

    render() {
        return (
            <div className="application">
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
