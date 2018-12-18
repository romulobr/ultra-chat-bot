import React from 'react';
import PropTypes from 'prop-types';
import {Form, Scope} from 'informed';
import CheckBoxOption from "./checkbox-option";

function PermissionsForm(props) {
    return (
        <Form id="permissionsForm" {...props}>
            <fieldset>
                <CheckBoxOption id="enabled" label="Enabled"/>
                {!props.nocommands && <CheckBoxOption id="simpleCommands" label="SimpleCommands (No !)"/>}
                <br/>
                {!props.nopermissions && <CheckBoxOption id="allowNormalUsers" label="Allow Normal Users"/>}
                {!props.nopermissions && <CheckBoxOption id="allowVips" label="Allow Vips"/>}
                {!props.nopermissions && <CheckBoxOption id="allowModerators" label="Allow Moderators"/>}
                {!props.nopermissions &&
                <CheckBoxOption id="allowSubscribersMembers" label="Allow Subscribers/Members"/>}
            </fieldset>
        </Form>
    );
}

export default PermissionsForm;
