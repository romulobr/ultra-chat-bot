import React from 'react';
import {Form, Scope} from 'informed';
import CheckBoxOption from "../forms/checkbox-option";
import NumberOption from "../forms/number-option";
import CooldownFieldset from '../forms/cooldown-fieldset';


function MediaOptionsForm(props) {
    return (
        <Form id="mediaForm" {...props}>
            <fieldset>
                <Scope scope="loyalty">
                    <CheckBoxOption id="streamElements" label="Charge points from Stream Elements"/>
                    <CheckBoxOption id="streamlabs" label="Charge points from Streamlabs"/>
                    <NumberOption id="defaultCost" label="Default Cost"/>
                </Scope>
            </fieldset>
            <CooldownFieldset/>
                <fieldset>
                    <Scope scope="video">
                        <NumberOption id="top" label="Default Vertical Adjust (px)"/>
                        <NumberOption id="left" label="Default Horizontal Adjust (px)"/>
                        <NumberOption id="size" label="Default Size (%)"/>
                    </Scope>
                </fieldset>
        </Form>
);
}

export default MediaOptionsForm;
