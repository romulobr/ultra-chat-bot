import React, {Component} from 'react';
import styles from './chicken-remote.module.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner'
import optionsFormStyles from '../options-form/options-form.module.scss';

class ChickenOptionsForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.getOptions = this.getOptions.bind(this);

        this.state = {};
        this.state.enabled = props.enabled || true;
        this.state.soundEnabled = props.soundEnabled || false;
        this.state.enabledForChat = props.enabledForChat || false;
        this.state.allowCommandsWithoutExclamation = props.allowCommandsWithoutExclamation || false;
        this.state.moveCommand = props.moveCommand || 'go';
        this.state.sayCommand = props.moveCommand || 'say';
    }

    render() {
        return (
            <div className={styles.chickenPanel}>
                {this.props.isLoading && (<LoadingSpinner/>)}
                <div className={optionsFormStyles.settings}>
                    <fieldset>
                        <label>
                            <input type="checkbox"
                                   name="enabled"
                                   checked={this.state.enabled}
                                   onChange={this.onToggle}
                                   disabled={this.props.loading}
                            />
                            <span>Enable</span>
                        </label>
                        <label>
                            <input type="checkbox"
                                   name="soundEnabled"
                                   checked={this.state.soundEnabled}
                                   onChange={this.onToggle}
                                   disabled={this.props.loading}
                            />
                            <span>Enable Sound</span>
                        </label>
                        <label>
                            <input type="checkbox"
                                   name="enabledForChat"
                                   checked={this.state.enabledForChat}
                                   onChange={this.onToggle}
                                   disabled={this.props.loading}
                            />
                            <span>Enable on Chat</span>
                        </label>
                        <label>
                            <input type="checkbox"
                                   name="allowCommandsWithoutExclamation"
                                   checked={this.state.allowCommandsWithoutExclamation}
                                   onChange={this.onToggle}
                                   disabled={this.props.loading}
                            />
                            <span>Enable commands without "!"</span>
                        </label>

                        <label>Move command
                            <span>
                            <input name="moveCommand"
                                   type="text"
                                   value={this.state.moveCommand}
                                   onChange={this.onChange}
                                   disabled={this.props.loading}
                            />
                        </span>
                        </label>
                        <label>Say command
                            <span>
                            <input name="sayCommand"
                                   type="text"
                                   value={this.state.sayCommand}
                                   onChange={this.onChange}
                                   disabled={this.props.loading}
                            />
                        </span>
                        </label>
                    </fieldset>
                </div>

                <div className="button-bar">
                    <button disabled={!this.props.user}
                            onClick={() => {
                                this.props.saveChickenOptions(this.getOptions())
                            }}>
                        Save
                    </button>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading !== this.props.loading) {
            this.setState(this.props);
        }
    }

    getOptions() {
        return this.state;
    }

    onChange = event => this.setState({...this.state, [event.target.name]: event.target.value});
    onToggle = event => this.setState({...this.state, [event.target.name]: !this.state[event.target.name]});
}

export default ChickenOptionsForm;
