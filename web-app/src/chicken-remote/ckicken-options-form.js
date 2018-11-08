import React, {Component} from 'react';
import styles from './chicken-remote.module.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner'
import optionsFormStyles from '../options-form/options-form.module.scss';

class ChickenOptionsForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);

        console.log('props on constructor', props);
        this.state = {...props}
    }

    render() {
        return (
            <div className={styles.chickenPanel}>
                {this.props.isLoading && (<LoadingSpinner/>)}
                <div className={optionsFormStyles.settings}>
                    <label>
                        <input type="checkbox"
                               name="enabled"
                               checked={this.state.enabled}
                               onChange={this.onToggle}/>
                        <span>Enable</span>
                    </label>
                    <label>
                        <input type="checkbox"
                               name="enabled"
                               checked={this.state.soundEnabled}
                               onChange={this.onToggle}/>
                        <span>Enable Sound</span>
                    </label>
                    <label>
                        <input type="checkbox"
                               name="enabledForChat"
                               checked={this.state.enabledForChat}
                               onChange={this.onToggle}/>
                        <span>Enable on Chat</span>
                    </label>
                    <label>
                        <input type="checkbox"
                               name="allowCommandsWithoutExclamation"
                               checked={this.state.allowCommandsWithoutExclamation}
                               onChange={this.onToggle}/>
                        <span>Enable commands without "!"</span>
                    </label>

                    <label>Move command
                        <span>
                            <input name="moveCommand"
                                   type="text"
                                   value={this.state.moveCommand}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                    <label>Say command
                        <span>
                            <input name="moveCommand"
                                   type="text"
                                   value={this.state.moveCommand}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                </div>
            </div>
        );
    }

    onChange = event => this.setState({...this.state, [event.target.name]: event.target.value});
    onToggle = event => this.setState({...this.state, [event.target.name]: !this.state[event.target.name]});
}

export default ChickenOptionsForm;
