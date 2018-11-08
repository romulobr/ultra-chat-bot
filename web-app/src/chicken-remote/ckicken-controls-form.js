import React, {Component} from 'react';
import optionsFormStyles from '../options-form/options-form.module.scss';

class ChickenControlsForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);

        console.log('props on constructor', props);
        this.state = {...props}
    }

    render() {
        return (
            <div className={optionsFormStyles.settings}>
                <label>Move chicken X
                    <span>
                            <input name="moveCommand"
                                   type="text"
                                   value={this.state.moveX}
                                   onChange={this.onChange}/>
                        </span>
                </label>
                <label>Move chicken Y
                    <span>
                            <input name="moveCommand"
                                   type="text"
                                   value={this.state.moveY}
                                   onChange={this.onChange}/>
                        </span>
                </label>
                <label>What to Say?
                    <span>
                            <input name="moveCommand"
                                   type="text"
                                   value={this.state.whatToSay}
                                   onChange={this.onChange}/>
                        </span>
                </label>
            </div>
        );
    }

    onChange = event => this.setState({...this.state, [event.target.name]: event.target.value});
    onToggle = event => this.setState({...this.state, [event.target.name]: !this.state[event.target.name]});
}

export default ChickenControlsForm;
