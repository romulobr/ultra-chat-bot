import React from 'react';
import TextOption from '../forms/text-option';
import {Form} from 'informed';
import CheckBoxOption from '../forms/checkbox-option';
import CooldownFieldset from '../forms/cooldown-fieldset';

function ChickenOptionsForm(props) {
    return (
        <Form id="options" {...props}>
            <CooldownFieldset/>
            <fieldset>
                <CheckBoxOption id={'enableSound'} label={'Enable Sound'}/>
                <TextOption id={'sayCommand'} label={"Say Command"}/>
                <TextOption id={'moveCommand'} label={"Move Command"}/>
            </fieldset>
        </Form>
    );
}

export default ChickenOptionsForm;
