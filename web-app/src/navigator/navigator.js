import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import AuthenticationPanel from '../authentication/authentication'
import MediaPanel from '../media/media';
import settingsPanelFor from '../settings-panel/settings-panel';
import actions from './navigation-actions';
import styles from './navigator.module.scss';
import posed, {PoseGroup} from 'react-pose';

import loyaltyFields from '../settings-panel/field-sets/features/loyalty-fields';
import quizFields from '../settings-panel/field-sets/features/quiz-fields';
import newsFields from '../settings-panel/field-sets/features/news-fields';
import welcomeFields from '../settings-panel/field-sets/features/welcome-fields';
import iconFields from '../settings-panel/field-sets/features/icons-fields'
import chickenFields from '../settings-panel/field-sets/features/chicken-fields'
const pjson = require('../../package.json');

const RoutesContainer = posed.div({
    enter: {
        opacity: 1,
        delay: 300,
        beforeChildren: true
    },
    exit: {opacity: 0}
});

const authentication = () => <AuthenticationPanel/>;
const media = () => <MediaPanel/>;
const chickenControls = settingsPanelFor('chicken', chickenFields);
const icons = settingsPanelFor('icons', iconFields);
const welcome = settingsPanelFor('welcome', welcomeFields);
const news = settingsPanelFor('news', newsFields);
const loyalty = settingsPanelFor('loyalty', loyaltyFields);
const quiz = settingsPanelFor('quiz', quizFields);

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = {showSettings: false};
    }

    render() {
        return (
            <Router>
                <Route
                    render={({location}) => (
                        <div className={styles.navigator}>
                            <div className={styles.viewPicker}>
                                <div className={styles.navigationItem + ' ' + styles.settingsMenu}
                                     onMouseEnter={() => {
                                         this.setState({showSettings: true})
                                     }}
                                     onMouseLeave={() => {
                                         this.setState({showSettings: false})
                                     }}
                                >
                                    <span role="img" aria-label={"settings"}>Ultra Vaca Chat Bot - <a href="https://twitch.tv/romulinotv" target="__blank">by RomulinoTV</a> (v{pjson.version})⚙</span>
                                    <div
                                        className={this.state.showSettings ? styles.settings : styles.settings + ' ' + styles.hidden}>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/') ? styles.selected : '')}
                                            to="/">
                                            <div>
                                                <span role="img">🌍 Connections</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/media-controls') ? styles.selected : '')}
                                            to="/media-controls">
                                            <div>
                                                <span role="img" aria-label={"tv"}>📺 Media</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/chicken') ? styles.selected : '')}
                                            to="/chicken">
                                            <div>
                                                <span role="img" aria-label={"chicken"}>🐔 Chicken</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/icons') ? styles.selected : '')}
                                            to="/icons">
                                            <div>
                                                <span role="img" aria-label={"chicken"}>😀 Icons</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/welcome') ? styles.selected : '')}
                                            to="/welcome">
                                            <div>
                                                <span role="img" aria-label={"welcome"}>🙋‍ Welcome</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/news') ? styles.selected : '')}
                                            to="/news">
                                            <div>
                                                <span role="img">📰 News</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/loyalty') ? styles.selected : '')}
                                            to="/loyalty">
                                            <div>
                                                <span role="img">🥇 Loyalty</span>
                                            </div>
                                        </Link>
                                        <Link
                                            className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/questions') ? styles.selected : '')}
                                            to="/quiz">
                                            <div>
                                                <span role="img">🥇 Quiz</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <PoseGroup>
                                <RoutesContainer key={location.pathname}>
                                    <Switch location={location}>
                                        <Route key={'connections'} exact path="/" component={authentication}/>
                                        <Route key={'media-controls'} path="/media-controls/" component={media}/>
                                        <Route key={'chicken'} path="/chicken/" component={chickenControls}/>
                                        <Route key={'welcome'} path="/welcome/" component={welcome}/>
                                        <Route key={'icons'} path="/icons/" component={icons}/>
                                        <Route key={'news'} path="/news/" component={news}/>
                                        <Route key={'loyalty'} path="/loyalty/" component={loyalty}/>
                                        <Route key={'quiz'} path={"/quiz/"} component={quiz}/>
                                    </Switch>
                                </RoutesContainer>
                            </PoseGroup>
                        </div>)}/>
            </Router>
        )
    }

    static isSelected(location, url) {
        return location.pathname === url;
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
