import React from 'react';
import {Form, Scope} from 'informed';
import CheckBoxOption from "../forms/checkbox-option";
import TextOption from "../forms/text-option";
import NumberOption from "../forms/number-option";

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
            <fieldset>
                <Scope scope="coolDown">
                    <NumberOption id="global" label="Global cooldown (seconds)"/>
                    <NumberOption id="user" label="User cooldown (seconds)"/>
                </Scope>
            </fieldset>
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
