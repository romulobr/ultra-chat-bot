import React, {Component} from 'react';
import './App.css';
import VideoPlayer from './video-player/video-player';
import AudioPlayer from './audio-player/audio-player';
import Chicken from './chicken/chicken';
class App extends Component {
    render() {
        return (
            <div className="App">
                <Chicken/>
                <VideoPlayer/>
                <AudioPlayer/>
            </div>
        );
    }
}

export default App;
