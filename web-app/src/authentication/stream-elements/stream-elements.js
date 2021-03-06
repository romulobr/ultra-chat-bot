import React, {Component} from 'react';
import styles from './stream-elements.module.scss';
import posed from 'react-pose';
import actions from './stream-elements-actions';
import {connect} from 'react-redux';

const Box = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
});

class SteamElements extends Component {
    constructor(props) {
        super(props);
        this.state = {token: props.token};
        this.editToken = props.editToken.bind(this);
        props.fetchToken();
        this.textAreaRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.token = this.props.token;
        if (!prevProps.isEditing && this.props.isEditing) {
            this.textAreaRef.current.focus();
            this.textAreaRef.current.select();
        }
    }

    editToken() {
        this.setState({...this.state, token: this.props.token}, () => {
            this.props.editToken();
        });
    }

    onTokenTextAreaChange = (e) => {
        this.setState({token: e.target.value});
    };

    render() {
        return (
            <div>
                <Box className={styles.tokenForm + ' ' + (this.props.isEditing ? '' : styles.hidden)}
                     pose={this.props.isEditing ? 'visible' : 'hidden'}>

                    <textarea ref={this.textAreaRef} value={this.state.token} onChange={this.onTokenTextAreaChange}/>

                    <div className={styles.buttons + ' ' + (this.props.isEditing ? '' : styles.hidden)}>
                        <div>
                            <button onClick={this.props.saveToken(this.state.token)}>Save</button>
                        </div>
                        <div>
                            <button onClick={this.props.cancelTokenEdition}>Cancel</button>
                        </div>
                    </div>
                </Box>

                <div>
                    {!this.props.isEditing && (
                        <button disabled={this.props.isLoading} onClick={this.props.editToken}>
                            {this.props.token ? 'Change StreamElements Token' : 'Add StreamElements Token (FIX ME)'}
                        </button>
                    )}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        ...state.streamElements,
        user: state.authentication.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchToken: () => {
            dispatch(actions.fetchToken());
        },
        editToken: () => {
            dispatch(actions.editToken());
        },
        cancelTokenEdition: () => {
            dispatch(actions.editTokenCancelled());
        },
        saveToken: (token) => {
            return () => dispatch(actions.saveToken(token));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SteamElements);
