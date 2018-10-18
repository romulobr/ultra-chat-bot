import React, { Component } from 'react';
import WelcomePanel from './welcome/welcome'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WelcomePanel/>
      </div>
    );
  }
}

export default App;
