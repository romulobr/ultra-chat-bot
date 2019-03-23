import React from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../urls';
import NumberOption from '../forms/number-option';
import TextOption from '../forms/text-option';
import CheckBoxOption from '../forms/checkbox-option';
import TextAreaOption from "../forms/text-area-option";
import CollapsiblePanel from '../collapsible-panel/collapsible-panel';
import {Form} from 'informed';
import {Scope} from 'informed';
import styles from './settings-panel.module.scss';
import {
    Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    Typography
} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";

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
        this.cleanEmpty = this.cleanEmpty.bind(this);
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
                <Button onClick={() => this.deleteFromArray(arrayField.id, index)}>Delete</Button>
            </div>
        )
    }

    renderContent(content) {
        const url = content.startsWith('http') ? content : `${mediaUrl}/${content}`;
        if (content.endsWith('.webm') || content.endsWith('.mp4')) {
            return (<video src={url} controls className={styles.arrayItemThumb}/>);
        }
        if (content.endsWith('.ogg') || content.endsWith('.mp3') || content.endsWith('.wav')) {
            return (<video src={url} controls poster="img/audio.png" className={styles.arrayItemThumb}/>);
        }
        if (content.endsWith('.jpg') || content.endsWith('.png') || content.endsWith('.webp') || content.endsWith('.gif') || content.endsWith('.jpeg')) {
            return (<img src={url} alt="thumbnail" controls className={styles.arrayItemThumb}/>);
        }
        return content;
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
    }

    editArrayItem(arrayField, index) {
        this.setState({isEditing: {arrayField, index}});
    }

    closeEditForm() {
        const index = this.state.isEditing.index;
        const field = this.state.isEditing.arrayField;
        this.setState({isEditing: false}, () => this.cleanEmpty(field, index));
    }

    cleanEmpty(field, index) {
        const possiblyEmptyArrayItem = this.state.data.options[field.id][index];
        const isEmpty = Object.values(possiblyEmptyArrayItem).reduce((isEmpty, currentValue) => {
            return isEmpty || !(currentValue)
        }, false);
        if (isEmpty) {
            const newState = {...this.state};
            newState.data.options[field.id].pop();
            this.setState(newState);
        }
    }

    updateArrayItem() {
        const newState = {...this.state};
        newState.data.options[this.state.isEditing.arrayField.id][this.state.isEditing.index] = this.editingForm.getState().values;
        newState.isEditing = false;
        const index = this.state.isEditing.index;
        const field = this.state.isEditing.arrayField;
        this.setState(newState, () => this.cleanEmpty(field, index));
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
            <div className={styles.array} key={`${arrayField.id}-${i}`}>
                <div className={styles.arrayHeader}><h2>{arrayField.label}<Button variant="success"
                                                                                  enabled={this.props.enabled}
                                                                                  onClick={() => this.addArrayItem(arrayField)}>Add</Button>
                </h2></div>
                <div className={styles.arrayBody}>
                    {
                        this.state.data && this.state.data.options && this.state.data.options[arrayField.id] && this.state.data.options[arrayField.id].map((item, i) => {
                            return (
                                <div className={styles.arrayItem} key={`${arrayField.id}-${i}`}>
                                    {arrayField.fields.map((field, i) => {
                                        return item[field.id] ? (<div key={i} className={styles.arrayItemContent}>
                                            {this.renderContent(item[field.id])}
                                        </div>) : ''
                                    })}

                                    <div className={styles.arrayItemButtons}>
                                        <Button type="button" variant="dark" size="sm"
                                                onClick={() => this.editArrayItem(arrayField, i)}>
                                            Edit
                                        </Button>
                                        <Button type="button" variant="danger" size="sm"
                                                onClick={() => this.deleteFromArray(arrayField.id, i)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>)
                        })
                    }
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
        const initialValues = (this.state.isEditing && this.formApi && this.formApi.getState().values.options && this.formApi.getState().values.options[this.state.isEditing.arrayField.id] && this.formApi.getState().values.options[this.state.isEditing.arrayField.id][this.state.isEditing.index]);
        return (
            <div>
                {this.state.isEditing && <div className={styles.arrayItemBackground}>
                    <div className={styles.arrayItemFormContainer}>
                        <ModalContent>
                            <ModalCloseButton onClick={() => {
                                this.closeEditForm();
                            }}/>
                            <ModalHeader>
                                <Typography variant="h5" m={0}>
                                    Editing
                                </Typography>
                            </ModalHeader>
                            <ModalBody>
                                <Form initialValues={initialValues}
                                      id={this.state.isEditing.arrayField.id}
                                      getApi={(formApi) => this.editingForm = formApi}>
                                    {this.state.isEditing.arrayField.fields.map((fields, i) => {
                                        return this.toFormField(fields, i);
                                    })}
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.updateArrayItem}
                                        variant="success"
                                        enabled={enabled}
                                        size="sm"
                                >
                                    Confirm Changes
                                </Button>
                                <Button variant="black" onClick={this.closeEditForm} enabled={enabled} size="sm">
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                        <div className={styles.arrayItemFormTitle}>
                        </div>
                        <div className={styles.arrayItemForm}>
                        </div>
                    </div>
                </div>}
                <Form id={id} getApi={(formApi) => this.formApi = formApi}>
                    {fieldSets.map((fieldSet, i) => {
                        return (
                            <div className={styles.fields}>
                                <h3>{fieldSet.label}</h3>
                                <Scope scope={fieldSet.id}>
                                    <fieldset>
                                        {fieldSet.fields.map(this.toFormField)}
                                    </fieldset>
                                </Scope>
                            </div>
                        )
                    })}
                </Form>
                <div className={styles.settingsButtonBar}>
                    <Button variant="success" onClick={this.saveData} enabled={enabled}> Save</Button>
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
