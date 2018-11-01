import React, {Component} from 'react';
import styles from './media.module.scss';
import spinnerStyles from './spinner.module.scss'
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import MyInput from './my-input';
import registerRendererEvents from './media-message-handlers';
import actions from './media-actions';
import AppView from '../navigator/app-view'

class MediaPanel extends Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.createMediaItem = this.createMediaItem.bind(this);
        this.deleteMediaItems = this.deleteMediaItems.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.toMediaItemJSX = this.toMediaItemJSX.bind(this);
        this.submit = this.submit.bind(this);
        this.toggleCheckedForDeletion = this.toggleCheckedForDeletion.bind(this);
        this.toggleAllCheckedForDeletion = this.toggleAllCheckedForDeletion.bind(this);
        this.state = {
            items: this.props.items,
            checkedForDeletion: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.props.registerRendererEvents();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items,
            checkedForDeletion: []
        });
    }

    toggleCheckedForDeletion(checkBoxIndex) {
        const newCheckedForDeletion = [...this.state.checkedForDeletion];
        let arrayIndexOrMinusOne = this.state.checkedForDeletion.indexOf(checkBoxIndex);
        if (arrayIndexOrMinusOne !== -1) {
            newCheckedForDeletion.splice(arrayIndexOrMinusOne, 1);
        } else {
            newCheckedForDeletion.push(checkBoxIndex);
        }
        this.setState({
            items: this.state.items,
            checkedForDeletion: newCheckedForDeletion
        });
    }

    toggleAllCheckedForDeletion() {
        let newCheckedForDeletion;
        if (this.state.checkedForDeletion.length === this.state.items.length) {
            newCheckedForDeletion = [];
        } else {
            newCheckedForDeletion = [...this.state.items.keys()];
        }
        this.setState({
            items: this.state.items,
            checkedForDeletion: newCheckedForDeletion
        });
    }

    toMediaItemJSX(item, index) {
        return (
            <tr key={'media-item-' + index}>
                <td>
                    <input type="checkbox" checked={this.state.checkedForDeletion.includes(index)} onChange={() => {
                        this.toggleCheckedForDeletion(index)
                    }}/>
                </td>
                <td
                    key={'media-item-' + index}
                >
                    <MyInput
                        name={'media-item-command-' + index}
                        value={item.command}
                    />
                </td>
                <td>
                    <MyInput
                        name={'media-item-url-' + index}
                        value={item.url}
                    />
                </td>
            </tr>
        );
    }

    createMediaItem() {
        const items = this.state.items;
        items.push({command: '', url: ''});
        this.setState({...this.state, items});
    }

    deleteMediaItems() {
        const newItems = [...this.state.items];
        this.state.checkedForDeletion.forEach(indexForDeletion => {
            newItems.splice(indexForDeletion, 1);
        });
        this.setState({
            items: newItems,
            checkedForDeletion: []
        });

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

    render() {
        //console.log('props: ', this.props);
        return (
            <div className={styles.mediaPanel}>
                <Formsy
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                >

                    <AppView className={spinnerStyles.loader} hidden={!this.props.loading}>
                        <svg className={spinnerStyles.circular}>
                            <circle className={spinnerStyles.path} cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                    stroke-miterlimit="10"/>
                        </svg>
                    </AppView>

                    <div className={styles.mediaList}>
                        <table>
                            <thead>
                            <tr>
                                <th onClick={this.toggleAllCheckedForDeletion}>Media</th>
                                <th>Command</th>
                                <th>File</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderItems(this.state.items)}
                            </tbody>
                        </table>
                    </div>
                    <button className={styles.button} disabled={this.props.loading} type="button"
                            onClick={this.deleteMediaItems}>
                        Delete
                    </button>
                    <button className={styles.button} disabled={this.props.loading} type="button"
                            onClick={this.createMediaItem}>
                        New
                    </button>

                    <button className={styles.button} type="submit" disabled={this.props.loading}>
                        Save
                    </button>
                    <button className={styles.button} type="button" disabled={this.props.loading}
                            onClick={this.props.importMedia}>
                        Import from media folder
                    </button>

                    <button className={styles.button} type="button" disabled={this.props.loading}
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
            dispatch(actions.saveMedia(items));
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
