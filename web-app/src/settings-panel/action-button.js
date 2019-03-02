import React from 'react';
import PropTypes from 'prop-types'

class ActionButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick} disabled={!this.props.enabled}>
                {this.props.text}
            </button>);
    }
}

ActionButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    enabled: PropTypes.bool
};

export default ActionButton;
