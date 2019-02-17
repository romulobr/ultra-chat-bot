import React, {Component} from 'react';
import styles from './loyalty.module.scss';

import {connect} from 'react-redux';
import actions from './loyalty-actions.js';
import OptionsForm from './loyalty-options-form';
import {Link} from "react-router-dom";
import PermissionsForm from "../forms/permissions-form";

class Loyalty extends Component {
    constructor() {
        super();
        this.options = React.createRef();
    }

    render() {
        return (
            <div className={styles.loyalty}>
                <PermissionsForm getApi={(formApi) => this.permissionsForm = formApi}/>
                <OptionsForm getApi={(formApi) => this.optionsForm = formApi}/>
                <div className="button-bar">
                    <button disabled={!this.props.user}
                            onClick={() => {
                                this.props.saveLoyaltyOptions({
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
        ...state.loyalty,
        user: state.authentication.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveLoyaltyOptions: (options) => {
            dispatch(actions.saveLoyalty(options))
        },
        fetchLoyaltyOptions: () => {
            dispatch(actions.fetchLoyalty())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loyalty);
