import React from 'react'
import NumberOption from './number-option';
import {Scope} from 'informed';

function CustomSourceFieldSet() {
    return ( <fieldset>
        <Scope scope="source">
            <NumberOption id="customSource" label="Custom Source"/>
        </Scope>
    </fieldset>);
}

export default CustomSourceFieldSet;
