import React from 'react'
import {Scope} from 'informed';
import TextOption from "./text-option";

function CustomSourceFieldSet() {
    return ( <fieldset>
        <Scope scope="source">
            <TextOption id="customSource" label="Custom Source"/>
        </Scope>
    </fieldset>);
}

export default CustomSourceFieldSet;
