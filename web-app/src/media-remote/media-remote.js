import React, {Component} from 'react';
import './media-remote.scss';
import {connect} from 'react-redux';

class MediaRemote extends Component {

    renderMediaItems(items) {
        return items.map((item, index) => {
            return (
                <h2 key={`media-item-${index}`}>{item.command}</h2>
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Media Remote</h1>
                {this.renderMediaItems(this.props.items)}
            </div>)
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
        playMedia: items => {
            dispatch({
                type: 'PLAY_MEDIA',
                items
            });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MediaRemote);
