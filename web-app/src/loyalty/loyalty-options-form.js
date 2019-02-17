import React from 'react';
import TextOption from '../forms/text-option';
import {Form} from 'informed';
import CheckBoxOption from '../forms/checkbox-option';
import CooldownFieldset from '../forms/cooldown-fieldset';
import CustomSourceFieldSet from "../forms/custom-source-fieldset";

function LoyaltyOptionsForm(props) {
    return (
        <Form id="options" {...props}>
            <CooldownFieldset/>
            <fieldset>
                <TextOption id={'pointsPerRound'} label={"Points per round"}/>
                <TextOption id={'roundDuration'} label={"Round Duration (minutes)"}/>
            </fieldset>
            <fieldset>
                <CheckBoxOption id={'enableSound'} label={'Enable Sound'}/>
                <TextOption id={'sound'} label={"sound file or url"}/>
            </fieldset>
        </Form>
    );
}

export default LoyaltyOptionsForm;
