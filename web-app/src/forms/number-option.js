import React from 'react'
import PropTypes from 'prop-types';
import {Text} from 'informed';

NumberOption.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

function NumberOption(props) {
    return (
        <React.Fragment>
            <label htmlFor={props.id}>
                <span>{props.label}
                    <Text field={props.id}
                          id={props.id}
                          validateOnChange={true}
                          validate={(value => isNaN(value) ? 'needs to be a number' : null)}
                          mask={(value) => value.replace(/[^\d.-]/g, '')}/>
                </span>
            </label>

        </React.Fragment>);
}

export default NumberOption;
