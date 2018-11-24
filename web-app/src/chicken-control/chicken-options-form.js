import React, {Component} from 'react';
import styles from './chicken-controls.module.scss';
import TextOption from "../forms/text-option";
import {Form} from 'informed';
import CheckBoxOption from "../forms/checkbox-option";

function ChickenOptionsForm(props) {
    return (
        <Form id="options" {...props}>
            <fieldset>
                <CheckBoxOption id={'enableSound'} label={'Enable Sound'}/>
                <TextOption id={'sayCommand'} label={"Say Command"}/>
                <TextOption id={'moveCommand'} label={"Move Command"}/>
            </fieldset>
        </Form>
    );
}

export default ChickenOptionsForm;
