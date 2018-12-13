import React from 'react';
import {Form} from 'informed';
import CooldownFieldset from '../forms/cooldown-fieldset';
import TextOption from "../forms/text-option";
import CheckboxOption from "../forms/checkbox-option"

function welcomeOptionsForm(props) {
    return (
        <Form id="welcomeForm" {...props}>
            <CooldownFieldset/>
            <fieldset>
                <TextOption id={'saveCommand'} label={"Save Command"}/>
                <TextOption id={'showCommand'} label={"Show Command"}/>
            </fieldset>
            <fieldset>
                <CheckboxOption id={'enableChickenAnnounce'} label={"Enable Chicken Announcement"}/>
                <TextOption id={'chickenAnnounce'} label={"Chicken Announcement"}/>
            </fieldset>
        </Form>
    );
}

export default welcomeOptionsForm;
