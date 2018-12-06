import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './welcome-actions.js';
import {Link} from "react-router-dom";
import PermissionsForm from "../forms/permissions-form";
import OptionsForm from "./welcome-options-form";
import styles from "./welcome.module.scss";


class WelcomeRemote extends Component {
    render() {
        return (
            <div className={styles.welcome}>
                <PermissionsForm getApi={(formApi) => this.permissionsForm = formApi}/>
                <OptionsForm getApi={(formApi) => this.optionsForm = formApi}/>
                <div className="button-bar">
                    <button disabled={!this.props.user}
                            onClick={() => {
                                this.props.saveWelcomeOptions({
                                    permissions: this.permissionsForm.getState().values,
                                    options: this.optionsForm.getState().values
                                })
                            }}>
                        Save Settings
                    </button>
                </div>
                {!this.props.user && (
                    <h2 className="warning">
                        You need to <Link to="/">connect a streaming account</Link> to be able to save your settings.
                    </h2>)}
            </div>)
    }

    componentDidMount() {
        this.props.data && this.props.data.permissions && this.permissionsForm.setValues(this.props.data.permissions);
        this.props.data && this.props.data.options && this.optionsForm.setValues(this.props.data.options);
    }

    componentDidUpdate() {
        this.props.data && this.props.data.permissions && this.permissionsForm.setValues(this.props.data.permissions);
        this.props.data && this.props.data.options && this.optionsForm.setValues(this.props.data.options);
    }
}

function mapStateToProps(state) {
    return {
        ...state.welcome,
        user: state.authentication.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveWelcomeOptions: (options) => {
            dispatch(actions.saveWelcome(options))
        },
        fetchWelcomeOptions: () => {
            dispatch(actions.fetchWelcome())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeRemote);
