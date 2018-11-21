import React, {Component} from 'react';
import optionsFormStyles from '../options-form/options-form.module.scss';
import styles from './chicken-controls.module.scss';

class ChickenControlsForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);

        this.state = {};
        this.state.moveX = 5;
        this.state.moveY = 5;
        this.state.whatToSay = 'Blah Blah Blah!'
    }

    render() {
        return (
            <div className={optionsFormStyles.settings}>
                <fieldset>
                    <p>Chicken</p>
                    <label>X
                        <span>
                            <input name="moveX"
                                   type="number"
                                   min="0"
                                   max="10"
                                   value={this.state.moveX}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                    <label>Y
                        <span>
                            <input name="moveY"
                                   type="number"
                                   min="0"
                                   max="10"
                                   value={this.state.moveY}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                    <label>What to Say?
                        <span>
                            <input name="whatToSay"
                                   type="text"
                                   value={this.state.whatToSay}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                    <div className={optionsFormStyles.buttonBar}>
                        <button className={styles.chickenItem} onClick={() => {
                            this.props.sendChickenCommand({move: {x: this.state.moveX, y: this.state.moveY}})
                        }}>
                            Move
                        </button>
                        <button className={styles.chickenItem} onClick={() => {
                            this.props.sendChickenCommand({move: {x: Math.random() * 10, y: Math.random() * 10}})
                        }}>
                            Random Move
                        </button>
                        <button className={styles.chickenItem} onClick={() => {
                            this.props.sendChickenCommand({say: this.state.whatToSay, sound: this.props.soundEnabled})
                        }}>
                            Say Message
                        </button>
                    </div>
                </fieldset>
            </div>

        );
    }

    onChange = event => this.setState({...this.state, [event.target.name]: event.target.value});
    onToggle = event => this.setState({...this.state, [event.target.name]: !this.state[event.target.name]});
}

export default ChickenControlsForm;
