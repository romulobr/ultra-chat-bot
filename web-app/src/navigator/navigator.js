import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import MediaPanel from '../media/media';
import settingsPanelFor from '../settings-panel/settings-panel';
import actions from './navigation-actions';
import styles from './navigator.module.scss';
import Help from '../help/help';

import loyaltyFields from '../settings-panel/field-sets/features/loyalty-fields';
import quizFields from '../settings-panel/field-sets/features/quiz-fields';
import newsFields from '../settings-panel/field-sets/features/news-fields';
import welcomeFields from '../settings-panel/field-sets/features/welcome-fields';
import iconFields from '../settings-panel/field-sets/features/icons-fields'
import chickenFields from '../settings-panel/field-sets/features/chicken-fields'
import AuthenticationCollapsiblePanel from '../authentication/authentication-collapsible-panel';
import LoyaltySystemsCollapsiblePanel from '../authentication/loyalty-systems-collapsible-panel';
import ChatConnectionsCollapsiblePanel from '../authentication/chat-connections-collapsible-panel';

const media = () => <MediaPanel/>;
const chickenControls = settingsPanelFor('chicken', chickenFields);
const icons = settingsPanelFor('icons', iconFields);
const welcome = settingsPanelFor('welcome', welcomeFields);
const news = settingsPanelFor('news', newsFields);
const loyalty = settingsPanelFor('loyalty', loyaltyFields);
const quiz = settingsPanelFor('quiz', quizFields);
const help = () => <Help/>;

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
                            <div className={styles.sideBar}>
                                <AuthenticationCollapsiblePanel/>
                                <LoyaltySystemsCollapsiblePanel/>
                                <ChatConnectionsCollapsiblePanel/>
                                <div className={styles.viewPicker}>
                                    <div className={styles.navigationItem}
                                         onMouseEnter={() => {
                                             this.setState({showSettings: true})
                                         }}
                                         onMouseLeave={() => {
                                             this.setState({showSettings: false})
                                         }}
                                    >
                                        <div>
                                            <Link to="/">
                                                <div
                                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/') ? styles.selected : '')}>
                                                    <span role="img">🤔 Help</span>
                                                </div>
                                            </Link>
                                            <Link to="/chicken">
                                                <div
                                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/chicken') ? styles.selected : '')}>
                                                    <span role="img" aria-label={"chicken"}>🐔 Chicken</span>
                                                </div>
                                            </Link>
                                            <Link to="/icons">
                                                <div
                                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/icons') ? styles.selected : '')}>
                                                    <span role="img" aria-label={"chicken"}>😀 Icons</span>
                                                </div>
                                            </Link>
                                            <Link to="/loyalty">
                                                <div
                                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/loyalty') ? styles.selected : '')}>
                                                    <span role="img">🥇 Loyalty</span>
                                                </div>
                                            </Link>
                                            <Link to="/media-controls">
                                                <div
                                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/media-controls') ? styles.selected : '')}>
                                                    <span role="img" aria-label={"tv"}>📺 Media</span>
                                                </div>
                                            </Link>
                                            <Link to="/news">
                                                <div
                                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/news') ? styles.selected : '')}>
                                                    <span role="img">📰 News</span>
                                                </div>
                                            </Link>
                                            {/*<Link to="/welcome">*/}
                                                {/*<div*/}
                                                    {/*className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/welcome') ? styles.selected : '')}>*/}
                                                    {/*<span role="img" aria-label={"welcome"}>🙋‍ Welcome</span>*/}
                                                {/*</div>*/}
                                            {/*</Link>*/}

                                            {/*<Link to="/quiz">*/}
                                                {/*<div*/}
                                                    {/*className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/quiz') ? styles.selected : '')}>*/}
                                                    {/*<span role="img">🥇 Quiz</span>*/}
                                                {/*</div>*/}
                                            {/*</Link>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Switch location={location}>
                                <div className={styles.navigatorContent}>
                                    <Route key={'media-controls'} path="/media-controls/" component={media}/>
                                    <Route key={'chicken'} path="/chicken/" component={chickenControls}/>
                                    {/*<Route key={'welcome'} path="/welcome/" component={welcome}/>*/}
                                    <Route key={'icons'} path="/icons/" component={icons}/>
                                    <Route key={'news'} path="/news/" component={news}/>
                                    <Route key={'loyalty'} path="/loyalty/" component={loyalty}/>
                                    {/*<Route key={'quiz'} path={"/quiz/"} component={quiz}/>*/}
                                    <Route key={'help'} exact path={"/"} component={help}/>
                                </div>
                            </Switch>
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
