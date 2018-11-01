import styles from './app-view.module.scss';
import React, {Component} from 'react';
import posed from 'react-pose';

const Box = posed.div({
    hidden: {left: 0,opacity:0},
    visible: {left: 0,opacity:1}
});

class AppView extends Component {
    render() {
        return (
            <Box className={this.props.hidden ? styles.appViewHidden : styles.appView}
                 pose={this.props.hidden ? 'hidden' : 'visible'}>
                {this.props.children}
            </Box>
        )
    }
}

export default AppView;
