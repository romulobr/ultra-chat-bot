import React, {Component} from 'react';
import styles from './chicken-remote.module.scss';
import optionsFormStyles from '../options-form/options-form.module.scss';

import {connect} from 'react-redux';
import actions from './chicken-remote-actions.js';
import OptionsForm from './ckicken-options-form';
import ChickenControls from './ckicken-controls-form';

class ChickenRemote extends Component {
    render() {
        return (
            <div className={styles.chickenRemote}>
                <div className={optionsFormStyles.form}>
                    <OptionsForm/>
                    <div className={optionsFormStyles.buttonBar}>
                        <button  onClick={() => {
                            this.props.moveChicken()
                        }}>
                            Save
                        </button>
                    </div>
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
}

function mapStateToProps(state) {
    return {
        ...state.chicken,
        user: state.users,
    };
}

const mapDispatchToProps = dispatch => {
    return {
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
