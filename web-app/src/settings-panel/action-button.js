import React from 'react';
import PropTypes from 'prop-types';
import styles from './settings-panel.module.scss';
import {Button} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";

class ActionButton extends React.Component {
    render() {
        return (
            <Button className={this.props.primary ? styles.primary : ''}
                    onClick={this.props.onClick}
                    disabled={!this.props.enabled}
                    variant="success"
            >
                {this.props.text}
            </Button>);
    }
}

ActionButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    enabled: PropTypes.bool
};

export default ActionButton;
