import React, {Component} from 'react';
import styles from './stream-elements.module.scss';
import authenticationStyles from '../authentication.module.scss';
import posed, {PoseGroup} from 'react-pose';
import actions from './stream-elements-actions';
import {connect} from 'react-redux';

const Box = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
});

class SteamElements extends Component {
    componentDidMount() {
        this.props.fetchToken();
    }

    render() {
        return (
            <div>
                <Box className={styles.tokenForm + ' ' + (this.props.isEditing ? '' : styles.hidden)}
                     pose={this.props.isEditing ? 'visible' : 'hidden'}>
                    <textarea/>
                    <div className={styles.buttons + ' ' + (this.props.isEditing ? '' : styles.hidden)}>
                        <div>
                            <button>Save</button>
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
                        {this.props.isLoading ? 'Loading...' : (this.props.token || 'No Token')}
                    </div>
                </div>
                <div>
                    {!this.props.isEditing && (<button disabled={this.props.isLoading} onClick={this.props.editToken}>
                        Add Token</button>)}
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
