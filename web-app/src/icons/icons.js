import React, {Component} from 'react';
import styles from './icons.module.scss';
import {connect} from 'react-redux';
import actions from './icons-actions';
import OptionsForm from './icons-options-form';
import {Link} from "react-router-dom";
import PermissionsForm from "../forms/permissions-form";

class icons extends Component {
    constructor() {
        super();
        this.options = React.createRef();
    }

    render() {
        return (
            <div className={styles.icons}>
                <PermissionsForm getApi={(formApi) => this.permissionsForm = formApi}/>
                <OptionsForm getApi={(formApi) => this.optionsForm = formApi} icons={this.props.data && this.props.data.options && this.props.data.options.icons}/>
                <div className="button-bar">
                    <button disabled={!this.props.user}
                            onClick={() => {
                                this.props.saveIconsOptions({
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
        ...state.icons,
        user: state.authentication.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveIconsOptions: (options) => {
            dispatch(actions.saveIcons(options))
        },
        fetchIconsOptions: () => {
            dispatch(actions.fetchIcons())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(icons);
