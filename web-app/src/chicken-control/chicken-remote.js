import React, {Component} from 'react';
import styles from './chicken-remote.module.scss';

import {connect} from 'react-redux';
import actions from './chicken-remote-actions.js';
import OptionsForm from './chicken-options-form';
import {Link} from "react-router-dom";

class ChickenRemote extends Component {
    constructor() {
        super();
        this.options = React.createRef();
    }

    render() {
        return (
            <div className={styles.chickenRemote}>
                <OptionsForm ref={this.options} {...this.props}/>
                {!this.props.user && (
                    <h2 className="warning">
                        You need to <Link to="/">connect a streaming account</Link> to be able to save your settings.
                    </h2>)}
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
