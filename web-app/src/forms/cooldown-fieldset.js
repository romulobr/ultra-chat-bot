import React from 'react'
import NumberOption from './number-option';
import {Scope} from 'informed';

function cooldownFieldset() {
    return (<fieldset>
        <Scope scope="cooldown">
            <NumberOption id="global" label="Global cooldown (seconds)"/>
            <NumberOption id="user" label="User cooldown (seconds)"/>
        </Scope>
    </fieldset>);
}

export default cooldownFieldset;
