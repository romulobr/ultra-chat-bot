import React, {Component} from 'react';
import Navigator from './navigator/navigator';

import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigator/>
            </div>
        );
    }
}

export default App;
