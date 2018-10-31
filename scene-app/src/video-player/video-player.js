import React, {Component} from 'react';
import {connect} from 'react-redux';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    render() {
        return (
            <div className="video-player">
                <video> </video>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.media,
        user: state.users,
    };
}

export default connect(mapStateToProps)(VideoPlayer);
