import React, {Component} from 'react';
import {connect} from 'react-redux';
import './video-player.scss';
import posed from 'react-pose';

const Box = posed.div({
    hidden: {
        position:'absolute',
        opacity: 1, transform: 'translateY(150%) rotate(-20deg)',
        transition: {duration: 1000}
    },
    visible: {
        position:'absolute',
        opacity: 1, transform: 'translateY(0%) rotate(0deg)',
        transition: {duration: 1000}
    }

});

class VideoPlayer extends Component {

    render() {
        return (
            <div className="application video">
                <Box className={'videoContainer'} pose={this.state.playing ? 'visible' : 'hidden'}>
                    <div style={this.state.playerStyle} className={'videoPlayer'}>
                        <video width="100%" ref={this.videoRef}/>
                        <div
                            className={(this.props.author && this.props.author.isChatSponsor ) ? 'videoPlayer__author videoPlayer__author-sponsor' : 'videoPlayer__author'}
                            pose={this.state.playing ? 'visible' : 'hidden'}>
                            {(this.props.author && this.props.author.name) || 'Ultra v3'}
                        </div>
                    </div>
                </Box>
            </div>)
    }

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.state = {playing: false, playerStyle: VideoPlayer.styleFromProps(props)};
    }

    static styleFromProps(props) {
        return {
            transform: `scale(${props.size / 100})` || '',
            top: `${props.top}px` || '20px',
            left: `${props.left}px` || '200px'
        };
    }

    componentDidMount() {
        const videoNode = this.videoRef.current;
        const that = this;
        videoNode.onended = function () {
            that.setState({playing: false})
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.url !== this.props.url) {
            const videoNode = this.videoRef.current;
            if (videoNode.src === this.props.url) {
                videoNode.currentTime = 0;
                videoNode.play();
                this.setState({playing: true, playerStyle: VideoPlayer.styleFromProps(this.props)})
            } else {
                videoNode.src = this.props.url;
                videoNode.play();
                this.setState({playing: true, playerStyle: VideoPlayer.styleFromProps(this.props)})
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.videoPlayer
    };
}

export default connect(mapStateToProps)(VideoPlayer);
