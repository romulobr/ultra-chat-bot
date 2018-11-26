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
                    <CheckBoxOption id="streamLabs" label="Charge points from Streamlabs"/>
                    <NumberOption id="defaultCost" label="Cost"/>
                </Scope>
            </fieldset>
            <CooldownFieldset/>
                <fieldset>
                    <Scope scope="video">
                        <NumberOption id="top" label="Video Vertical adjust (px)"/>
                        <NumberOption id="left" label="Video Horizontal adjust (px)"/>
                        <NumberOption id="size" label="Video Size (%)"/>
                    </Scope>
                </fieldset>
        </Form>
);
}

export default MediaOptionsForm;
