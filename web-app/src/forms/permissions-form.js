import React from 'react';
import PropTypes from 'prop-types';
import {Form, Scope} from 'informed';
import CheckBoxOption from "./checkbox-option";

function PermissionsForm(props) {
    return (
        <Form id="permissionsForm" {...props}>
            <fieldset>
                <CheckBoxOption id="enabled" label="Enabled"/>
                <CheckBoxOption id="simpleCommands" label="SimpleCommands (No !)"/>
                <br/>
                <CheckBoxOption id="allowNormalUsers" label="Allow Normal Users"/>
                <CheckBoxOption id="allowVips" label="Allow Vips"/>
                <CheckBoxOption id="allowModerators" label="Allow Moderators"/>
                <CheckBoxOption id="allowSubscribersMembers" label="Allow Subscribers/Members"/>
            </fieldset>
        </Form>
    );
}

export default PermissionsForm;
