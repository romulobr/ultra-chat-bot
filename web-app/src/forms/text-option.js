import React from 'react'
import PropTypes from 'prop-types';
import {Text} from 'informed';

TextOption.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

function TextOption(props) {
    return (
        <React.Fragment>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <Text field={props.id} id={props.id}/>
        </React.Fragment>);
}

export default TextOption;
