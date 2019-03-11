import React from 'react'
import PropTypes from 'prop-types';
import {TextArea} from 'informed';

TextAreaOption.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

function TextAreaOption(props) {
    return (
        <React.Fragment>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            <TextArea field={props.id} id={props.id}/>
        </React.Fragment>);
}

export default TextAreaOption;
