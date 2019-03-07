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
        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toFormField = this.toFormField.bind(this);
        this.arraySubForm = this.arraySubForm.bind(this);
        this.arrayItemSubForm = this.arrayItemSubForm.bind(this);
        this.addArrayItem = this.addArrayItem.bind(this);
        this.deleteFromArray = this.deleteFromArray.bind(this);
        this.props.onFetch();
    }

    arrayItemSubForm(arrayField, index) {
        return (
            <div className={styles.arrayItemForm}>
                <fieldset>
                    <Scope scope={`${arrayField.id}[${index}]`} key={index}>
                        {arrayField.fields.map((field, i) => {
                            return this.toFormField(field, i);
                        })}
                    </Scope>
                </fieldset>
                <button className={styles.deleteButton} onClick={() => this.deleteFromArray(arrayField.id, index)}>
                    Delete
                </button>
            </div>
        )
    }

    addArrayItem(arrayField) {
        const formData = this.formApi.getState().values;
        if (!formData.options) {
            formData.options = {};
        }
        const arrayData = formData.options[arrayField.id];
        let newArrayData = [];

        if (arrayData) {
            newArrayData = [...formData.options[arrayField.id]];
        }

        const newArrayItem = {};
        arrayField.fields.forEach(field => {
            newArrayItem[field.id] = '';
        });
        newArrayData.push(newArrayItem);
        const newState = {...this.state};
        if (!newState.data.options) {
            newState.data.options = {};
        }
        newState.data.options[arrayField.id] = newArrayData;
        this.setState(newState);
    }

    deleteFromArray(arrayId, index) {
        const newArrayData = [...this.formApi.getState().values.options[arrayId]];
        newArrayData.splice(index, 1);
        const newState = {...this.state};
        newState.data.options[arrayId] = newArrayData;
        this.setState(newState);
    }

    arraySubForm(arrayField, i) {
        return (
            <div className={styles.arraySubForm} key={i}>
                <h3> {arrayField.label}</h3>
                {
                    this.state.data && this.state.data.options && this.state.data.options[arrayField.id] && this.state.data.options[arrayField.id].map((item, i) => {
                        return this.arrayItemSubForm(arrayField, i);
                    })
                }
                <div className={styles.buttonBar}>
                    <button onClick={() => this.addArrayItem(arrayField)}>Add</button>
                </div>
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
        console.log('prevProps', JSON.stringify(prevProps));
        console.log('props', JSON.stringify(this.props));
        console.log('prevState', JSON.stringify(prevState));
        console.log('state', JSON.stringify(this.state));

        this.formApi.setValues(this.state.data);

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
                <div className={styles.buttonBar}>
                    <ActionButton onClick={this.saveData} text={'Save'} enabled={enabled}> </ActionButton>
                </div>
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
