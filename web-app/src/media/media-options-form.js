import React, {Component} from 'react';
import styles from './media.module.scss';
import optionsFormStyles from '../options-form/options-form.module.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner'

class MediaOptionsForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.state = {...props}
    }

    render() {
        return (
            <div className={styles.mediaPanel}>
                {this.props.isLoading && (<LoadingSpinner/>)}
                <div className={optionsFormStyles.settings}>
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
                    <label>
                        <input type="checkbox"
                               name="moderatorsOnly"
                               checked={this.state.moderatorsOnly}
                               onChange={this.onToggle}/>
                        <span>Moderators Only</span>
                    </label>
                    <label>
                        <input type="checkbox"
                               name="enableStreamElementsIntegration"
                               checked={this.state.enableStreamElementsIntegration}
                               onChange={this.onToggle}/>
                        <span>Enable StreamElements Integration (need a valid token)</span>
                    </label>
                    <label>
                        <input type="checkbox"
                               name="enableStreamlabsIntegration"
                               checked={this.state.enableStreamlabsIntegration}
                               onChange={this.onToggle}/>
                        <span>Enable Streamlabs Integration (need to be connected)</span>
                    </label>
                    <label>Cost per chat play:
                        <span>
                            <input name="costPerChatPlay"
                                   type="text"
                                   value={this.state.costPerChatPlay}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                    <label>Global cooldown (seconds)
                        <span>
                            <input name="globalCooldown"
                                   type="text"
                                   value={this.state.globalCooldown}
                                   onChange={this.onChange}/>
                        </span>
                    </label>
                    <label>Per user cooldown (seconds)
                        <span>
                            <input name="perUserCooldown"
                                   type="text"
                                   value={this.state.perUserCooldown}
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

export default MediaOptionsForm;
