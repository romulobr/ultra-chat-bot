import React from 'react';
import {Form} from 'informed';
import CooldownFieldset from '../forms/cooldown-fieldset';

function welcomeOptionsForm(props) {
    return (
        <Form id="welcomeForm" {...props}>
            <CooldownFieldset/>
        </Form>
    );
}

export default welcomeOptionsForm;
