import React from 'react';
import {Form} from 'informed';
import CooldownFieldset from '../forms/cooldown-fieldset';
import TextOption from "../forms/text-option";

function welcomeOptionsForm(props) {
    return (
        <Form id="welcomeForm" {...props}>
            <CooldownFieldset/>
            <fieldset>
                <TextOption id={'saveCommand'} label={"Save Command"}/>
                <TextOption id={'showCommand'} label={"Show Command"}/>
            </fieldset>
        </Form>
    );
}

export default welcomeOptionsForm;
