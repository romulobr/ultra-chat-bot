import React, { Component } from 'react';
import AuthenticationPanel from './authentication/authentication'
import MediaPanel from './media/media';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthenticationPanel/>
        <MediaPanel/>
      </div>
    );
  }
}

export default App;
