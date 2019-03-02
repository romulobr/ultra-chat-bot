import React from 'react';
import {Form, Scope} from 'informed';
import CheckBoxOption from "../forms/checkbox-option";
import NumberOption from "../forms/number-option";
import CooldownFieldset from '../forms/cooldown-fieldset';
import CustomSourceFieldSet from "../forms/custom-source-fieldset";

function MediaOptionsForm(props) {
    return (
        <Form id="mediaForm" {...props}>
            <fieldset>
                <Scope scope="loyalty">
                    <CheckBoxOption id="streamElements" label="Use StreamElements"/>
                    <CheckBoxOption id="streamlabs" label="Use Streamlabs"/>
                    <CheckBoxOption id="nativePower" label="Use Native Loyalty (Power)"/>
                    <CheckBoxOption id="nativeLove" label="Use Native Loyalty (Love)"/>
                    <NumberOption id="defaultCost" label="Default Cost"/>
                </Scope>
            </fieldset>
            <CooldownFieldset/>
            <fieldset>
                <NumberOption id="defaultVolume" label="Default Volume"/>
            </fieldset>
            <CustomSourceFieldSet/>
        </Form>
    );
}

export default MediaOptionsForm;
