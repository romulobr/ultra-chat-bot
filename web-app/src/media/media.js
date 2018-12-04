import React, {Component} from 'react';
import styles from './media.module.scss';
import {connect} from 'react-redux';
import registerRendererEvents from './media-message-handlers';
import actions from './media-actions';
import LoadingSpinner from '../loading-spinner/loading-spinner'
import MediaOptionsForm from './media-options-form';
import {Link} from 'react-router-dom';
import PermissionsForm from "../forms/permissions-form";
import {Form, Scope, Text, Checkbox} from 'informed';

class MediaPanel extends Component {
    constructor(props) {
        super(props);
        this.createMediaItem = this.createMediaItem.bind(this);
        this.deleteMediaItems = this.deleteMediaItems.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.toMediaItemJSX = this.toMediaItemJSX.bind(this);
        this.saveMedia = this.saveMedia.bind(this);
        this.toggleAllCheckedForDeletion = this.toggleAllCheckedForDeletion.bind(this);
        this.state = {
            items: (this.props.data && this.props.data.items) || [],
            options: {}
        };
    }

    render() {
        return (
            <div className={styles.mediaPanel}>
                {this.props.isLoading && (<LoadingSpinner/>)}
                <div className='button-bar'>
                    <button type="button"
                            onClick={this.props.openMediaFolder}>
                        Copy files
                    </button>
                    <button type="button" onClick={this.props.importMedia}>
                        Import files
                    </button>
                    <button type="button"
                            disabled={this.props.loading || !this.props.user}
                            onClick={() => this.saveMedia()}>
                        Save Settings
                    </button>
                </div>

                <PermissionsForm getApi={(formApi) => this.permissionsForm = formApi}/>
                <MediaOptionsForm getApi={(formApi) => this.optionsForm = formApi}/>

                {!this.props.user && (
                    <h2 className="warning">
                        You need to <Link to="/">connect a streaming account</Link> to be able to save your settings.
                    </h2>)}
                <div className={styles.mediaList}>
                    <Form getApi={(formApi) => this.itemsForm = formApi}>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <button type="button" onClick={this.toggleAllCheckedForDeletion}>All</button>
                                </th>
                                <th>Command</th>
                                <th>File/URL</th>
                                <th>Cost</th>
                                <th>Size(%)</th>
                                <th>Vertical Adj</th>
                                <th>Horizontal Adj</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderItems(this.state.items)}
                            </tbody>
                        </table>
                    </Form>
                </div>
                {this.renderButtonBar()}
            </div>
        );
    }

    renderButtonBar() {
        return (
            <div>
                <div className='button-bar'>
                    <button type="button"
                            onClick={this.deleteMediaItems}>
                        Delete
                    </button>
                    <button type="button"
                            onClick={this.createMediaItem}>
                        New
                    </button>

                    <button type="button"
                            disabled={this.props.loading || !this.props.user}
                            onClick={() => this.saveMedia()}>
                        Save Settings
                    </button>
                </div>
            </div>
        )
    }

    saveMedia() {
        const permissions = this.permissionsForm.getState().values;
        const options = this.optionsForm.getState().values;
        const items = this.itemsForm.getState().values.items;
        this.props.saveMedia({permissions, options, items})
    }

    componentDidMount() {
        this.props.registerRendererEvents();
        this.props.data && this.props.data.permissions && this.permissionsForm.setValues(this.props.data.permissions);
        this.props.data && this.props.data.options && this.optionsForm.setValues(this.props.data.options);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            ...props
        }
    }

    componentDidUpdate() {
        this.props.data && this.props.data.permissions && this.permissionsForm.setValues(this.props.data.permissions);
        this.props.data && this.props.data.options && this.optionsForm.setValues(this.props.data.options);
    }

    toMediaItemJSX(item, index) {
        return (
            <tr key={`media-item-${JSON.stringify(item)}`}>
                <Scope scope={`items[${index}]`}>
                    <td>
                        <Checkbox field="delete" id={`item-${index}-delete`}/>
                    </td>
                    <td>
                        <Text field="command" id={`item-${index}-command`} initialValue={item.command}/>
                    </td>
                    <td>
                        <Text field="url" id={`item-${index}-url`} initialValue={item.url}/>
                    </td>
                    <td>
                        <Text field="cost" id={`item-${index}-cost`} initialValue={item.cost}/>
                    </td>
                    <td>
                        <Text field="size" id={`item-${index}-size`} initialValue={item.size}/>
                    </td>
                    <td>
                        <Text field={"left"} id={`item-${index}-left`} initialValue={item.left}/>
                    </td>
                    <td>
                        <Text field={"top"} id={`item-${index}-top`} initialValue={item.top}/>
                    </td>
                </Scope>
            </tr>
        );
    }

    createMediaItem() {
        const items = this.state.items;
        items.push({});
        this.setState({...this.state, items});
    }

    deleteMediaItems() {
        const newItems = this.itemsForm.getState().values.items.filter(item => !item.delete);
        this.setState({
            items: newItems
        });
    }

    toggleAllCheckedForDeletion() {
        const originalItems = this.itemsForm.getState().values.items;
        let items = originalItems;
        if (originalItems.every(item => item.delete)) {
            items = originalItems.map(item => {
                item.delete = false;
                return item;
            })
        } else {
            items = originalItems.map(item => {
                item.delete = true;
                return item;
            });
        }
        this.itemsForm.setValues({items});
    };

    renderItems(items) {
        return items ? items.map(this.toMediaItemJSX) : null;
    }
}

function mapStateToProps(state) {
    return {
        ...state.media,
        user: state.authentication.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveMedia: form => {
            dispatch(actions.saveMedia(form));
        },
        fetchMedia: () => {
            dispatch(actions.fetchMedia());
        },
        importMedia: () => {
            dispatch(actions.importMedia());
        },
        openMediaFolder: () => {
            dispatch(actions.openMediaFolder());
        },
        registerRendererEvents: () => {
            registerRendererEvents(dispatch)
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaPanel);
