import React, { Component } from 'react';
import './media.scss';
import { connect } from 'react-redux';
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
    this.submit = this.submit.bind(this);
    this.state = {
      items: this.props.items
    };
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
    items.push({ command: '', url: '' });
    this.setState({ ...this.state, items });
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
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
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
    console.log('model to items:', model, '\n\nitems:', items, '\n\n\n');
    this.props.saveMedia(items);
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
          onSubmit={this.submit}
        >
          <div className="media-panel__media-list">
            {this.renderItems(this.state.items)}
          </div>
          <button type="button" onClick={this.createMediaItem}>
            New
          </button>

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
    items: state.media.items || [],
    user: state.users
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
    fetchMedia: items => {
      dispatch({
        type: 'FETCH_MEDIA'
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPanel);
