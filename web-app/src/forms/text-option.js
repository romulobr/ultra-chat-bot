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
                <span>{props.label}
                    <Text field={props.id} id={props.id}/>
                </span>
            </label>

        </React.Fragment>);
}

export default TextOption;
