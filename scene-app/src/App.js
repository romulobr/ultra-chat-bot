import React, {Component} from 'react';
import './App.css';
import VideoPlayer from './video-player/video-player';
import AudioPlayer from './audio-player/audio-player';
import Chicken from './chicken/chicken';
import Icons from './icons/icons';
import Welcome from './welcome/welcome';
import News from './news/news';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Icons/>
                <Chicken/>
                <VideoPlayer/>
                <AudioPlayer/>
                <Welcome/>
                <News/>
            </div>
        );
    }
}

export default App;
