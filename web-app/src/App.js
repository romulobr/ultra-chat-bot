import React, {Component} from 'react';
import Navigator from './navigator/navigator';

import './App.scss';
import { Normalize } from '@smooth-ui/core-sc'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Normalize />
                <Navigator/>
            </div>
        );
    }
}

export default App;
