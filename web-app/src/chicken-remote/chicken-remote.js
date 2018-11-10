import React, {Component} from 'react';
import styles from './chicken-remote.module.scss';
import optionsFormStyles from '../options-form/options-form.module.scss';

import {connect} from 'react-redux';
import actions from './chicken-remote-actions.js';
import OptionsForm from './chicken-options-form';
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
                    <ChickenControls {...this.props}/>
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
        sendChickenCommand: (command) => {
            dispatch(actions.sendChickenCommand(command));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChickenRemote);
