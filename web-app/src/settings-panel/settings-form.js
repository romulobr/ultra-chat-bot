import React from 'react';
import PropTypes from 'prop-types';
import NumberOption from '../forms/number-option';
import TextOption from '../forms/text-option';
import CheckBoxOption from '../forms/checkbox-option';
import TextAreaOption from "../forms/text-area-option";
import {Form} from 'informed';
import {Scope} from 'informed';
import ActionButton from './action-button';
import styles from './settings-panel.module.scss';

export default class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.arrays = {};
        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toFormField = this.toFormField.bind(this);
        this.arraySubForm = this.arraySubForm.bind(this);
        this.arrayItemSubForm = this.arrayItemSubForm.bind(this);
        this.addArrayItem = this.addArrayItem.bind(this);
        this.props.onFetch();
    }

    arrayItemSubForm(arrayField, index) {
        return (<fieldset>
            {arrayField.fields.map((field, i) => {
                const arrayIndexField = {...field, id: `${field.id}[${index}]`};
                return this.toFormField(arrayIndexField, i);
            })}
            <br/>
            <button>Delete</button>
        </fieldset>)
    }

    addArrayItem(arrayField) {
        this.arrays[arrayField.id] = this.arrays[arrayField.id] || (this.props.data && this.props.data[arrayField.id]) || [];
        const arrayData = this.arrays[arrayField.id];
        const newArrayItem = {};
        arrayField.fields.forEach(field => {
            newArrayItem[field.id] = '';
        });
        arrayData.push(newArrayItem);
        this.setState({data: {...this.state.data, [arrayField.id]: [...arrayData]}});
    }

    arraySubForm(arrayField) {
        return (
            <div className={styles.arraySubForm}>
                <h3> {arrayField.label}</h3>
                {/*<div>{JSON.stringify(this.state)}</div>*/}
                {/*{JSON.stringify(this.state.data && this.state.data[arrayField.id])}*/}
                {
                    this.state.data && this.state.data[arrayField.id] && this.state.data[arrayField.id].map((item, i) => {
                        return this.arrayItemSubForm(arrayField, i);
                    })
                }
                <button onClick={() => this.addArrayItem(arrayField)}>Add</button>
            </div>)
    }

    toFormField(field, i) {
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
        else if (field.type === 'array') {
            return this.arraySubForm(field);
        }
        else {
            return <div>unsupported field type</div>
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevState.data) !== JSON.stringify(this.state.data)) {
            this.formApi.setValues(this.state.data);
        }
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({data: {...this.state.data, ...this.props.data}});
            this.formApi.setValues(this.props.data);
        }
    }

    updateData(newData) {
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
                                    <fieldset>
                                        {fieldSet.fields.map(this.toFormField)}
                                    </fieldset>
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
