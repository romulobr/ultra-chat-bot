import React, {Component} from 'react';
import './App.css';
import VideoPlayer from './video-player/video-player'
import AudioPlayer from './audio-player/audio-player'

class App extends Component {
    render() {
        return (
            <div className="App">
                <VideoPlayer/>
                <AudioPlayer/>
            </div>
        );
    }
}

export default App;
