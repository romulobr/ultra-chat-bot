import React from 'react';
import PropTypes from 'prop-types';
import NumberOption from '../forms/number-option';
import TextOption from '../forms/text-option';
import CheckBoxOption from '../forms/checkbox-option';
import TextAreaOption from "../forms/text-area-option";
import {Form} from 'informed';
import {Scope} from 'informed';
import ActionButton from './action-button';

export default class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);

        this.props.onFetch();
    }

    static toFormField(field, i) {
        if (field.type === 'number') {
            return <NumberOption id={field.id} label={field.label} key={i}/>
        }
        else if (field.type === 'text') {
            return <TextOption id={field.id} label={field.label} key={i}/>
        }
        else if (field.type === 'checkbox') {
            return <CheckBoxOption id={field.id} label={field.label} key={i}/>
        }
        else if (field.type === 'textArea') {
            return <TextAreaOption id={field.id} label={field.label} key={i}/>
        }
        else {
            return <div>unsupported field type</div>
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('updated', prevProps, this.props);
        if (prevProps.data !== this.props.data) {
            this.formApi.setValues(this.props.data);
        }
    }

    updateData(newData) {
        debugger;
        this.setState({data: newData});
        this.props.onData(newData);
    };

    saveData() {
        this.props.onSave(this.formApi.getState().values);
    };

    render() {
        const {id, enabled, fieldSets} = this.props;
        return (
            <div>
                <Form id={id} getApi={(formApi) => this.formApi = formApi}>
                    {fieldSets.map((fieldSet, i) => {
                        return (
                            <fieldset key={i} disabled={!enabled}>
                                <h3>{fieldSet.label}</h3>
                                <Scope scope={fieldSet.id}>
                                    {fieldSet.fields.map(SettingsForm.toFormField)}
                                </Scope>
                            </fieldset>
                        )
                    })}
                </Form>
                <ActionButton onClick={this.saveData} text={'Save'} enabled={enabled}> </ActionButton>
            </div>
        );
    };
}

SettingsForm.propTypes = {
    id: PropTypes.string,
    fieldSets: PropTypes.array,
    enabled: PropTypes.bool,
    onData: PropTypes.func,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    error: PropTypes.object,
};

const fieldsExample =
    [{
        name: 'a fieldset',
        fields: [{
            id: 'internalFieldIdentifier',
            label: 'displayed Title',
            type: 'string'
        },
            {
                id: 'anotherInternalFieldIdentifier',
                label: 'displayed Title',
                type: 'array',
                fields: [{
                    id: 'arrayFieldIdentifier',
                    label: 'displayed Title',
                    type: 'number'
                }]
            }]
    }];
