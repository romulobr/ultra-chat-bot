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
        this.state.arrays = {};
        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toFormField = this.toFormField.bind(this);
        this.arraySubForm = this.arraySubForm.bind(this);
        this.arrayItemSubForm = this.arrayItemSubForm.bind(this);
        this.addArrayItem = this.addArrayItem.bind(this);
        this.deleteFromArray = this.deleteFromArray.bind(this);
        this.editArrayItem = this.editArrayItem.bind(this);
        this.closeEditForm = this.closeEditForm.bind(this);
        this.updateArrayItem = this.updateArrayItem.bind(this);
        this.handleEscapePress = this.handleEscapePress.bind(this);
        this.props.onFetch();
    }

    arrayItemSubForm(arrayField, index) {
        return (
            <div className={styles.arrayItemForm} key={index}>
                <fieldset>
                    <Scope scope={`${arrayField.id}[${index}]`} key={index}>
                        {arrayField.fields.map((field, i) => {
                            return this.toFormField(field, i);
                        })}
                    </Scope>
                </fieldset>
                <ActionButton onClick={() => this.deleteFromArray(arrayField.id, index)} text={'Delete'}/>
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
        this.editArrayItem(arrayField, newArrayData.length - 1);
        // this.setState(newState);
    }

    editArrayItem(arrayField, index) {
        this.setState({isEditing: {arrayField, index}});
    }

    closeEditForm() {
        this.setState({isEditing: false});
    }

    updateArrayItem() {
        const newState = {...this.state};
        newState.data.options[this.state.isEditing.arrayField.id][this.state.isEditing.index] = this.editingForm.getState().values;
        newState.isEditing = false;
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
            <div className={styles.arraySubForm} key={`${arrayField.id}-${i}`}>
                <h3> {arrayField.label}</h3>
                {
                    this.state.data && this.state.data.options && this.state.data.options[arrayField.id] && this.state.data.options[arrayField.id].map((item, i) => {
                        return (
                            <div className={styles.arrayItem} key={`${arrayField.id}-${i}`}>

                                {arrayField.fields.map((field, i) => {
                                    return item[field.id] ? (<div key={i} className={styles.arrayItemContent}>
                                        <span>{item[field.id]}</span>
                                    </div>) : ''
                                })}

                                <div className={styles.arrayItemButtons}>
                                    <button type="button" className={styles.editButton}
                                            onClick={() => this.editArrayItem(arrayField, i)}>
                                        Edit
                                    </button>
                                    <button type="button" className={styles.deleteButton}
                                            onClick={() => this.deleteFromArray(arrayField.id, i)}>
                                        Delete
                                    </button>
                                </div>
                            </div>)
                    })
                }
                <div className={styles.buttonBar}>
                    <ActionButton primary enabled={this.props.enabled} onClick={() => this.addArrayItem(arrayField)}
                                  text={'Add'}/>
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
            return this.arraySubForm(field, i);
        }
        else {
            return <div>unsupported field type</div>
        }
    }

    handleEscapePress(event) {
        if (event.keyCode === 27) {
            this.closeEditForm();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEscapePress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscapePress, false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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
        const initialValues = (this.state.isEditing && this.formApi && this.formApi.getState().values.options[this.state.isEditing.arrayField.id] && this.formApi.getState().values.options[this.state.isEditing.arrayField.id][this.state.isEditing.index]);
        console.log('initial values', initialValues);
        return (
            <div>
                {this.state.isEditing && <div className={styles.arrayItemBackground}>
                    <div className={styles.arrayItemFormContainer}>
                        <div className={styles.arrayItemFormTitle}>
                            <span>Editing</span>
                            <button onClick={() => {
                                this.closeEditForm();
                            }}>X
                            </button>
                        </div>
                        <div className={styles.arrayItemForm}>
                            <Form initialValues={initialValues}
                                  id={this.state.isEditing.arrayField.id}
                                  getApi={(formApi) => this.editingForm = formApi}>
                                {this.state.isEditing.arrayField.fields.map((fields, i) => {
                                    return this.toFormField(fields, i);
                                })}
                                <ActionButton onClick={this.updateArrayItem} primary text={'Confirm Changes'}
                                              enabled={enabled}/>
                                <ActionButton onClick={this.closeEditForm} text={'Cancel'} enabled={enabled}/>
                            </Form>
                        </div>
                    </div>
                </div>}
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
                    <ActionButton primary onClick={this.saveData} text={'Save'} enabled={enabled}> </ActionButton>
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
