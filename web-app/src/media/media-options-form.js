import React, {Component} from 'react';
import styles from './media.module.scss';
import optionsFormStyles from '../options-form/options-form.module.scss';
import LoadingSpinner from '../loading-spinner/loading-spinner'

class MediaOptionsForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.state = {};
        this.state.enabled = props.enabled || true;
        this.state.enabledForChat = props.enabledForChat || false;
        this.state.allowCommandsWithoutExclamation = props.allowCommandsWithoutExclamation || false;
        this.state.moderatorsOnly = props.moderatorsOnly || false;
        this.state.enableStreamElementsIntegration = props.enableStreamElementsIntegration || false;
        this.state.enableStreamlabsIntegration = props.enableStreamlabsIntegration || false;
        this.state.videoPosition = props.videoPosition || 'video-position-bottom';
        this.state.costPerChatPlay = props.costPerChatPlay || 0;
        this.state.globalCooldown = props.globalCooldown || 60;
        this.state.perUserCooldown = props.perUserCooldown || 5;
        this.state.videoTop = props.videoTop || 20;
        this.state.videoLeft = props.videoLeft || 20;
        this.state.videoWidth = props.videoWidth || 33;
    }

    render() {
        return (
            <div>
                {this.props.isLoading && (<LoadingSpinner/>)}
                <div className={optionsFormStyles.settings}>
                    <fieldset>
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
                            <span>Allow simple commands (No Exclamation) </span>
                        </label>
                        {/*<label>*/}
                            {/*<input type="checkbox"*/}
                                   {/*name="allowCommandsWithoutExclamation"*/}
                                   {/*checked={this.state.allowCommandsWithoutExclamation}*/}
                                   {/*onChange={this.onToggle}/>*/}
                            {/*<span>Allow permissive form: "message with COMMAND on it"</span>*/}
                        {/*</label>*/}
                        <label>
                            <input type="checkbox"
                                   name="moderatorsOnly"
                                   checked={this.state.moderatorsOnly}
                                   onChange={this.onToggle}/>
                            <span>Moderators Only</span>
                        </label>
                    </fieldset>
                    <fieldset>
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
                                   type="number"
                                   value={this.state.costPerChatPlay}
                                   onChange={this.onChange}/>
                        </span>
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>Global cooldown (seconds)
                            <span>
                            <input name="globalCooldown"
                                   type="number"
                                   value={this.state.globalCooldown}
                                   onChange={this.onChange}/>
                        </span>
                        </label>
                        <label>Per user cooldown (seconds)
                            <span>
                            <input name="perUserCooldown"
                                   type="number"
                                   value={this.state.perUserCooldown}
                                   onChange={this.onChange}/>
                        </span>
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>Video Position Top (px)
                            <span>
                            <input name="videoTop"
                                   type="number"
                                   value={this.state.videoTop}
                                   onChange={this.onChange}/>
                        </span>
                        </label>
                        <label>Video Position Left (px)
                            <span>
                            <input name="videoLeft"
                                   type="number"
                                   value={this.state.videoLeft}
                                   onChange={this.onChange}/>
                        </span>
                        </label>
                        <label>Video Width (%)
                            <span>
                            <input name="videoWidth"
                                   type="number"
                                   value={this.state.videoWidth}
                                   onChange={this.onChange}/>
                        </span>
                        </label>
                    </fieldset>
                </div>
            </div>
        );
    }

    onChange = event => this.setState({...this.state, [event.target.name]: event.target.value});
    onToggle = event => this.setState({...this.state, [event.target.name]: !this.state[event.target.name]});
}

export default MediaOptionsForm;
