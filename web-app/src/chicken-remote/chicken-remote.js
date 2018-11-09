import React, {Component} from 'react';
import styles from './chicken-remote.module.scss';
import optionsFormStyles from '../options-form/options-form.module.scss';

import {connect} from 'react-redux';
import actions from './chicken-remote-actions.js';
import OptionsForm from './ckicken-options-form';
import ChickenControls from './ckicken-controls-form';

class ChickenRemote extends Component {
    constructor() {
        super();
        this.options = React.createRef();
    }

    render() {
        return (
            <div className={styles.chickenRemote}>
                <div className={optionsFormStyles.form}>
                    <OptionsForm ref={this.options} {...this.props}/>

                </div>
                <div className={optionsFormStyles.form}>
                    <ChickenControls/>
                    <div className={optionsFormStyles.buttonBar}>
                        <button className={styles.chickenItem} onClick={() => {
                            this.props.moveChicken()
                        }}>
                            Move Chicken
                        </button>
                        <button className={styles.chickenItem} onClick={() => {
                            this.props.chickenSay()
                        }}>
                            Say Message
                        </button>
                    </div>
                </div>
            </div>)
    }

    componentDidMount() {
        this.props.fetchChickenOptions();
    }
}

function mapStateToProps(state) {
    return {
        ...state.chickenControls,
        user: state.users,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveChickenOptions: (options) => {
            dispatch(actions.saveChicken(options))
        },
        fetchChickenOptions: () => {
            dispatch(actions.fetchChicken())
        },
        moveChicken: (x, y) => {
            dispatch(actions.chickenMove({x, y}));
        },
        chickenSay: (message) => {
            dispatch(actions.chickenSpeak({message}));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChickenRemote);
