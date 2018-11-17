import React, {Component} from 'react';
import './App.css';
import VideoPlayer from './video-player/video-player';
import AudioPlayer from './audio-player/audio-player';
import Chicken from './chicken/chicken';
import Emotions from './emotions/emotions';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Emotions/>
                <Chicken/>
                <VideoPlayer/>
                <AudioPlayer/>
            </div>
        );
    }
}

export default App;
