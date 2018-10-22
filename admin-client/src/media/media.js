import React, {Component} from 'react';
import './media.scss';
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import MyInput from './my-input';

class MediaPanel extends Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.createMediaItem = this.createMediaItem.bind(this);
        this.deleteMediaItem = this.deleteMediaItem.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.toMediaItemJSX = this.toMediaItemJSX.bind(this);
        this.state = {
            canSubmit: false,
            items: this.props.items,
            deletedItems: [],
            newItems: []
        };
    }

    toMediaItemJSX(item, index) {
        return (
            <div className="media-panel media-panel__media-item" key={'media-item-' + index}>
                <MyInput className="media-panel__media-item__command"
                         name={'media-item-command-' + index}
                         value={item.command}/>

                <div className="media-panel__media-item__arrow"> ➡</div>
                <MyInput className="media-panel__media-item__url" name={'media-item-url-' + index} value={item.url}/>
                <div className="media-panel__media-item__delete-button" onClick={this.deleteMediaItem(index)}>
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
            var collections = items.slice(0, index).concat(items.slice(index + 1, items.length));
            this.setState({
                ...this.state,
                items: collections
            });
        }
    }

    submit(model) {
        console.log('submitted:', model);
    }

    disableButton() {
        this.setState({canSubmit: false});
    }

    enableButton() {
        this.setState({canSubmit: true});
    }

    renderItems(items) {
        console.log('items:', items);
        return items ? items.map(this.toMediaItemJSX) : null;
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
                    <div className="media-panel__media-list">
                        {this.renderItems(this.state.items)}
                    </div>
                    <button onClick={this.createMediaItem}>New</button>
                    <button type="submit" disabled={!this.state.canSubmit}>
                        Save
                    </button>
                </Formsy>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.media.items
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveMediaList: () => {
            dispatch({
                type: 'SAVE_MEDIA_LIST'
            });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaPanel);
