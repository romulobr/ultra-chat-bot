import React from 'react'
import PropTypes from 'prop-types';
import {Checkbox} from 'informed';

CheckBoxOption.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

function CheckBoxOption(props) {
    return (
        <React.Fragment>
            <label htmlFor={props.id}>
                <Checkbox field={props.id} id={props.id}/>
                <span>{props.label}</span>
            </label>
        </React.Fragment>);
}

export default CheckBoxOption;
