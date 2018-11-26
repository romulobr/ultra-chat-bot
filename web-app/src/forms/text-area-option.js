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
                <span>{props.label}
                    <TextArea field={props.id} id={props.id}/>
                </span>
            </label>

        </React.Fragment>);
}

export default TextAreaOption;
