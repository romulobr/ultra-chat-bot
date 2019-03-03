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
                <TextOption id={'subscriberMultiplier'} label={"Joined/Sub Multiplier"}/>
                <TextOption id={'roundDurationInMinutes'} label={"Round Duration (minutes)"}/>
            </fieldset>
            <fieldset>
                <CheckBoxOption id={'enableSound'} label={'Enable Sound when giving love'}/>
                <TextOption id={'sound'} label={"Sound File or URL"}/>
            </fieldset>
            <fieldset>
                <CheckBoxOption id={'showIcon'} label={'Show Icon when giving love'}/>
                <TextOption id={'icon'} label={"Icon Image or URL"}/>
            </fieldset>
            <CustomSourceFieldSet/>
        </Form>
    );
}

export default LoyaltyOptionsForm;
