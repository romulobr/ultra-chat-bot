import React, { Component } from 'react';
import './media.scss';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import MyInput from './my-input';

function toMediaItemJSX(item, index) {
  return (
    <div
      className="media-panel media-panel__media-item"
      key={'media-item-' + index}
    >
      <div className="media-panel__media-item__delete-button">Delete</div>
      <MyInput
        className="media-panel__media-item__command"
        name={'media-item-command-' + index}
        value={item.command}
      />
      <div className="media-panel__media-item__arrow">➡</div>
      <MyInput
        className="media-panel__media-item__url"
        name={'media-item-url-' + index}
        value={item.url}
      />
    </div>
  );
}
class MediaPanel extends Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      canSubmit: false,
      itemCount: props.items.count,
      deletedItems: [],
      newItems: []
    };
  }
  submit(model) {
    console.log('submitted:', model);
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  renderItems(items) {
    console.log('items:', items);
    return items ? items.map(toMediaItemJSX) : null;
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
            {this.renderItems(this.props.items)}
          </div>
          <button>New</button>
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
