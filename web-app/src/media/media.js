import React, {Component} from 'react';
import './media.scss';
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import MyInput from './my-input';
import registerRendererEvents from './media-message-handlers';

class MediaPanel extends Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.createMediaItem = this.createMediaItem.bind(this);
        this.deleteMediaItem = this.deleteMediaItem.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.toMediaItemJSX = this.toMediaItemJSX.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            items: this.props.items
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.props.registerRendererEvents();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items
        });
    }

    toMediaItemJSX(item, index) {
        return (
            <div
                className="media-panel media-panel__media-item"
                key={'media-item-' + index}
            >
                <MyInput
                    className="media-panel__media-item__command"
                    name={'media-item-command-' + index}
                    value={item.command}
                />

                <div className="media-panel__media-item__arrow"> ➡</div>
                <MyInput
                    className="media-panel__media-item__url"
                    name={'media-item-url-' + index}
                    value={item.url}
                />
                <div
                    className="media-panel__media-item__delete-button"
                    onClick={this.deleteMediaItem(index)}
                >
                    Delete
                </div>
            </div>
        );
    }

    createMediaItem() {
        const items = this.state.items;
        items.push({command: '', url: ''});
        this.setState({...this.state, items});
    }

    deleteMediaItem(index) {
        return () => {
            console.log('deleted item #' + index);
            const items = this.state.items;
            var collections = items
                .slice(0, index)
                .concat(items.slice(index + 1, items.length));
            this.setState({
                ...this.state,
                items: collections
            });
        };
    }

    disableButton() {
        this.setState({canSubmit: false});
    }

    enableButton() {
        this.setState({canSubmit: true});
    }

    submit(model) {
        let index = 0;

        function modelToItems(model) {
            const items = [];
            for (index = 0; index < Object.keys(model).length / 2; index++) {
                items.push({
                    command: model['media-item-command-' + index],
                    url: model['media-item-url-' + index]
                });
            }
            return items;
        }

        const items = modelToItems(model);
        this.props.saveMedia(items);
    }

    renderItems(items) {
        return items ? items.map(this.toMediaItemJSX) : null;
    }

    getMediaListClass(props) {
        return props.loading ? 'media-panel__media-list__hidden' : 'media-panel__media-list';
    }

    getMediaLoadingClass(props) {
        return props.loading ? 'media-panel__media-loading' : 'media-panel__media-loading__hidden';
    }

    getButtonClass(props) {
        return props.loading ? 'media-panel__button__hidden' : 'media-panel__button'
    }

    render() {
        //console.log('props: ', this.props);
        return (
            <div className="media-panel">
                <h2>Media List</h2>
                <Formsy
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                >
                    <div className={this.getMediaLoadingClass(this.props)}>
                        <img src="/img/loading.gif" alt="loading spinner"></img>
                    </div>
                    <div className={this.getMediaListClass(this.props)}>
                        {this.renderItems(this.state.items)}
                    </div>
                    <button className={this.getButtonClass(this.props)} disabled={this.props.loading} type="button"
                            onClick={this.createMediaItem}>
                        New
                    </button>

                    <button className={this.getButtonClass(this.props)} type="submit" disabled={this.props.loading}>
                        Save
                    </button>
                    <h2>Import</h2>
                    <button className={this.getButtonClass(this.props)} type="button" disabled={this.props.loading}
                            onClick={this.props.importMedia}>
                        Import from media folder
                    </button>

                    <button className={this.getButtonClass(this.props)} type="button" disabled={this.props.loading}
                            onClick={this.props.openMediaFolder}>
                        Open media folder
                    </button>
                </Formsy>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.media,
        user: state.users,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveMedia: items => {
            dispatch({
                type: 'SAVE_MEDIA',
                items
            });
        },
        fetchMedia: () => {
            dispatch({
                type: 'FETCH_MEDIA'
            });
        },
        importMedia: () => {
            dispatch({
                type: 'IMPORT_MEDIA'
            });
        },
        openMediaFolder: () => {
            dispatch({
                type: 'OPEN_MEDIA_FOLDER'
            });
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
