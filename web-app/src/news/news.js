import React, {Component} from 'react';
import styles from './news.module.scss';
import {connect} from 'react-redux';
import actions from './news-actions';
import OptionsForm from './news-options-form';
import {Link} from "react-router-dom";
import PermissionsForm from "../forms/permissions-form";

class news extends Component {
    constructor() {
        super();
        this.options = React.createRef();
    }

    render() {
        return (
            <div className={styles.news}>
                <PermissionsForm getApi={(formApi) => this.permissionsForm = formApi}
                                 nocommands
                                 nopermissions
                />
                <OptionsForm getApi={(formApi) => this.optionsForm = formApi}
                             news={this.props.data && this.props.data.options && this.props.data.options.news}
                />
                <div className="button-bar">
                    <button disabled={!this.props.user}
                            onClick={() => {
                                const newsItem = this.optionsForm.getState().values;
                                newsItem.news = newsItem.news && newsItem.news.filter(newsItem => !!newsItem);
                                console.log(newsItem);
                                this.props.saveNewsOptions({
                                    permissions: this.permissionsForm.getState().values,
                                    options: newsItem
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
        ...state.news,
        user: state.authentication.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveNewsOptions: (options) => {
            dispatch(actions.saveNews(options))
        },
        fetchNewsOptions: () => {
            dispatch(actions.fetchNews())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(news);
