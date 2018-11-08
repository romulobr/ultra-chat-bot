import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './chicken.module.scss'
import standing from './img/chicken-standing.gif';
import walking from './img/chicken-walking.gif';

class Chicken extends Component {

    constructor(props) {
        super(props);
        this.state = {moving: false};
    }

    render() {
        return (
            <div className={styles.chicken}>
                <img src={standing} style={{visibility:this.state.moving?'hidden':'visible'}}/>
                <img src={walking} style={{visibility:this.state.moving?'visible':'hidden'}}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.chicken
    };
}

export default connect(mapStateToProps)(Chicken);
