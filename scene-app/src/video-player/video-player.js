import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './video-player.module.scss';
import posed from 'react-pose';

const Box = posed.div({
    hidden: {opacity: 0, width:0},
    visible: {opacity: 1,width:'100%'}
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
            videoNode.src = '';
            that.setState({playing: false})
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.video) {
            const videoNode = this.videoRef.current;
            if (videoNode.src === nextProps.video) {
                videoNode.currentTime = 0;
                videoNode.play();
                this.setState({playing: true})
            } else {
                videoNode.src = nextProps.video;
                videoNode.play();
                this.setState({playing: true})
            }

        }
        console.log(nextProps);
    }

    render() {
        return (
            <Box className={styles.videoPlayer + " box"} pose={this.state.playing ? 'visible' : 'hidden'}>
                <video width="100%" ref={this.videoRef}/>
            </Box>)
    }

}

function mapStateToProps(state) {
    return {
        ...state.videoPlayer
    };
}

export default connect(mapStateToProps)(VideoPlayer);
