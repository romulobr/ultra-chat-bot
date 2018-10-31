import React, {Component} from 'react';
import AuthenticationPanel from './authentication/authentication'
import MediaPanel from './media/media';
import MediaRemote from './media-remote/media-remote';
import ChatControls from './chat-controls/chat-controls';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthenticationPanel/>
                <MediaRemote/>
                <ChatControls/>
                <MediaPanel/>
            </div>
        );
    }
}

export default App;
