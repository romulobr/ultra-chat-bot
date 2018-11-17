import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import AuthenticationPanel from '../authentication/authentication'
import MediaPanel from '../media/media';
import MediaRemote from '../media-remote/media-remote';
import ChickenRemote from '../chicken-remote/chicken-remote'
import ChatControls from '../chat-controls/chat-controls';
import actions from './navigation-actions';

import styles from './navigator.module.scss';
import posed, {PoseGroup} from 'react-pose';

const RoutesContainer = posed.div({
    enter: {
        opacity: 1,
        delay: 300,
        beforeChildren: true
    },
    exit: {opacity: 0}
});

const authentication = () => <AuthenticationPanel/>;
const chatControls = () => <ChatControls/>;
const media = () => <MediaPanel/>;
const mediaRemote = () => <MediaRemote/>;
const chickenControls = () => <ChickenRemote/>;

class Navigator extends Component {
    render() {
        return (
            <Router>
                <Route
                    render={({location}) => (
                        <div className={styles.navigator}>
                            <div className={styles.viewPicker}>
                                <Link to="/">
                                    <div className={styles.navigationItem}><span role="img">⚙</span> Settings
                                    </div>
                                </Link>
                                <Link to="/media">
                                    <div className={styles.navigationItem}><span role="img" aria-label={"tv"}>📺</span>
                                        Media
                                    </div>
                                </Link>
                                <Link to="/remote">
                                    <div className={styles.navigationItem}><span role="img"
                                                                                 aria-label={"remote"}>📱</span>
                                        Remote
                                    </div>
                                </Link>
                                <Link to="/chicken">
                                    <div className={styles.navigationItem}><span role="img"
                                                                                 aria-label={"chicken"}>🐔</span>
                                        Chicken
                                    </div>
                                </Link>
                                <Link to="/chat">
                                    <div className={styles.navigationItem}><span role="img"
                                                                                 aria-label={"chat"}>💬</span>
                                        Chat-Bot
                                    </div>
                                </Link>
                            </div>
                            <PoseGroup>
                                <RoutesContainer key={location.pathname}>
                                    <Switch location={location}>
                                        <Route key={'auth'} exact path="/" component={authentication}/>
                                        <Route key={'media'} path="/media/" component={media}/>
                                        <Route key={'remote'} path="/remote/" component={mediaRemote}/>
                                        <Route key={'chat'} path="/chat/" component={chatControls}/>
                                        <Route key={'chicken'} path="/chicken/" component={chickenControls}/>
                                    </Switch>
                                </RoutesContainer>
                            </PoseGroup>
                        </div>)}/>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {...state.navigator};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (destination) => dispatch(actions.navigateTo(destination))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
