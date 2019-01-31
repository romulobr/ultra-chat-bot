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
                    <CheckBoxOption id="streamElements" label="Charge points from Stream Elements"/>
                    <CheckBoxOption id="streamlabs" label="Charge points from Streamlabs"/>
                    <NumberOption id="defaultCost" label="Default Cost"/>
                </Scope>
            </fieldset>
            <CooldownFieldset/>
           <CustomSourceFieldSet/>
        </Form>
    );
}

export default MediaOptionsForm;
