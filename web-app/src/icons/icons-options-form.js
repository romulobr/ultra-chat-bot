import React, {Component} from 'react';
import {Form, Scope, Text, TextArea} from 'informed';
import CooldownFieldset from '../forms/cooldown-fieldset';
import styles from './icons.module.scss';
import CustomSourceFieldSet from "../forms/custom-source-fieldset";

class IconsOptionsForm extends Component {
    constructor() {
        super();
        this.state = {icons: []};
        this.addIcon = this.addIcon.bind(this);
        this.deleteIcon = this.deleteIcon.bind(this);
        this.renderIcons = this.renderIcons.bind(this);
    }

    render() {
        return (
            <Form id="options" {...this.props}>
                <CustomSourceFieldSet/>
                <CooldownFieldset/>
                <fieldset>
                    {this.renderIcons()}
                </fieldset>
                <div className="button-bar">
                    <button onClick={this.addIcon}>
                        Add
                    </button>
                </div>
            </Form>
        );
    }

    renderIcons(formState) {
        console.log('state icons', this.state.icons);
        return this.state.icons && this.state.icons.map((icon, index) => {
            return (
                <div className={styles.icon} key={`icon-${index}-${JSON.stringify(icon)}`}>
                    <div>
                        <Scope scope={`icons[${index}]`}>
                            Image: (file in media folder or internet url)
                            <Text field="image" id={`icon-${index}-${JSON.stringify(icon)}-image`}
                                  initialValue={icon.image}
                            />
                            Words:<TextArea field="words" id={`icon-${index}-${JSON.stringify(icon)}-words`}
                                            initialValue={icon.words}
                        />
                        </Scope>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => {
                            this.deleteIcon(index, formState)
                        }}>Delete
                        </button>
                    </div>
                </div>)
        });
    }

    addIcon() {
        const newIcons = [].concat(this.state.icons);
        newIcons.push({image: '', words: ''});
        this.setState({icons: newIcons})
    }

    deleteIcon(index) {
        const newIcons = ([].concat(this.state.icons));
        newIcons.splice(index,1);
        this.setState({icons: newIcons})
    }

    componentDidMount() {
        this.setState({icons: this.props.icons || []});
    }
}

export default IconsOptionsForm;
