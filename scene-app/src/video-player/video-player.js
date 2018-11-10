import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './video-player.scss';
import posed from 'react-pose';

const Box = posed.div({
    hidden: {
        opacity: 0, width: '100%',transform: 'translateY(150%) rotate(-20deg)'

    },
    visible: {
        opacity: 1, width: '100%', transform: 'translateY(0%) rotate(0deg)'
    }

});

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.state = {playing: false};
    }

    componentDidMount() {
        const videoNode = this.videoRef.current;
        const that = this;
        videoNode.onended = function () {
            that.setState({playing: false})
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.video !== this.props.video) {
            const videoNode = this.videoRef.current;
            if (videoNode.src === this.props.video) {
                videoNode.currentTime = 0;
                videoNode.play();
                this.setState({playing: true})
            } else {
                videoNode.src = this.props.video;
                videoNode.play();
                this.setState({playing: true})
            }
        }
    }

    render() {
        return (
            <div className={'videoContainer'}>
            <Box className={'videoPlayer box'} pose={this.state.playing ? 'visible' : 'hidden'}>
                <video width="100%" ref={this.videoRef}/>
            </Box>
            </div>)
    }

}

function mapStateToProps(state) {
    return {
        ...state.videoPlayer
    };
}

export default connect(mapStateToProps)(VideoPlayer);
