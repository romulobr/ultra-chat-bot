import React, {Component} from 'react';
import styles from './stream-elements.module.scss';
import authenticationStyles from '../authentication.module.scss';
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

    componentDidUpdate() {
        this.state.token = this.props.token;
        if (this.props.isEditing) {
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
                <div className={authenticationStyles.accountInformation} style={{
                    backgroundImage: 'url(img/stream-elements.jpg)',
                    filter: this.props.token ? '' : 'grayscale(100%)'
                }}>
                    <div className={styles.token}>
                        {this.props.isLoading ? 'Loading...' : (this.props.token ? 'Ready' : 'No Token')}
                    </div>
                </div>
                <div>
                    {!this.props.isEditing && (
                        <button disabled={this.props.isLoading} onClick={this.props.editToken}>
                            {this.props.token ? 'Change Token' : 'Add Token'}
                        </button>
                    )}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        ...state.streamElements
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
