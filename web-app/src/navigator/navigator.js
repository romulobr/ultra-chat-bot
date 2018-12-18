import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import AuthenticationPanel from '../authentication/authentication'
import MediaPanel from '../media/media';
import MediaRemote from '../remote-control/remote-control';
import ChickenRemote from '../chicken-control/chicken-controls';
import Icons from '../icons/icons';
import News from '../news/news';
import Welcome from '../welcome/welcome';
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
const media = () => <MediaPanel/>;
const mediaRemote = () => <MediaRemote/>;
const chickenControls = () => <ChickenRemote/>;
const icons = () => <Icons/>;
const welcome = () => <Welcome/>;
const news = () => <News/>;

class Navigator extends Component {
    render() {
        return (
            <Router>
                <Route
                    render={({location}) => (
                        <div className={styles.navigator}>
                            <div className={styles.viewPicker}>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/') ? styles.selected : '')}
                                    to="/">
                                    <div>
                                        <span role="img">🌍</span>
                                    </div>
                                </Link>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/media-controls') ? styles.selected : '')}
                                    to="/media-controls">
                                    <div>
                                        <span role="img" aria-label={"tv"}>📺</span>
                                    </div>
                                </Link>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/chicken') ? styles.selected : '')}
                                    to="/chicken">
                                    <div>
                                        <span role="img" aria-label={"chicken"}>🐔</span>
                                    </div>
                                </Link>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/icons') ? styles.selected : '')}
                                    to="/icons">
                                    <div>
                                        <span role="img" aria-label={"chicken"}>💖</span>
                                    </div>
                                </Link>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/welcome') ? styles.selected : '')}
                                    to="/welcome">
                                    <div>
                                        <span role="img" aria-label={"welcome"}>🙋‍</span>
                                    </div>
                                </Link>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/news') ? styles.selected : '')}
                                    to="/news">
                                    <div>
                                        <span role="img">📰</span>
                                    </div>
                                </Link>
                                <Link
                                    className={styles.navigationItem + ' ' + (Navigator.isSelected(location, '/remote') ? styles.selected : '')}
                                    to="/remote">
                                    <div>
                                        <span role="img" aria-label={"remote"}>📱</span>
                                    </div>
                                </Link>
                            </div>
                            <PoseGroup>
                                <RoutesContainer key={location.pathname}>
                                    <Switch location={location}>
                                        <Route key={'connections'} exact path="/" component={authentication}/>
                                        <Route key={'media-controls'} path="/media-controls/" component={media}/>
                                        <Route key={'remote'} path="/remote/" component={mediaRemote}/>
                                        <Route key={'chicken'} path="/chicken/" component={chickenControls}/>
                                        <Route key={'welcome'} path="/welcome/" component={welcome}/>
                                        <Route key={'icons'} path="/icons/" component={icons}/>
                                        <Route key={'news'} path="/news/" component={news}/>
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
