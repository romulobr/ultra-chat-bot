import React, {Component} from 'react';
import {connect} from 'react-redux';

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
            <div>
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
                    <div>
                        <button onClick={() => {
                            this.props.sendChickenCommand({
                                chicken: {
                                    move: {x: this.state.moveX, y: this.state.moveY}
                                },
                                source: this.props.options && this.props.options.source && this.props.options.source.customSource
                            })
                        }}>
                            Move
                        </button>
                        <button onClick={() => {
                            this.props.sendChickenCommand({
                                chicken: {
                                    move: {x: Math.random() * 10, y: Math.random() * 10}
                                },
                                source: this.props.options && this.props.options.source && this.props.options.source.customSource
                            })
                        }}>
                            Random Move
                        </button>
                        <button onClick={() => {
                            this.props.sendChickenCommand({
                                chicken: {
                                    say: this.state.whatToSay,
                                    sound: this.props.options && this.props.options.enableSound
                                },
                                source: this.props.options && this.props.options.source && this.props.options.source.customSource
                            });
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

function mapStateToProps(state) {
    console.log(state.chicken);
    return {
        ...state.chicken.data
    };
}

const mapDispatchToProps = dispatch => {
    return {
        sendChickenCommand: (command) => {
            alert('not implemented');
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChickenControlsForm);
