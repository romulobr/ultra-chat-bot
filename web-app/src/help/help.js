import React from 'react';
import styles from './help.module.scss';
import {connect} from 'react-redux';
import getSettingActionsFor from '../settings-panel/settings-actions';
import {Button} from "@smooth-ui/core-sc/dist/smooth-ui-core-sc";
import CollapsiblePanel from "../collapsible-panel/collapsible-panel";

const pjson = require('../../package.json');

const mediaActions = getSettingActionsFor('media');
const chickenActions = getSettingActionsFor('chicken');
const iconsActions = getSettingActionsFor('icons');
const welcomeActions = getSettingActionsFor('welcome');
const newsActions = getSettingActionsFor('news');
const loyaltyActions = getSettingActionsFor('loyalty');
const quizActions = getSettingActionsFor('quiz');

function getDetectedSources(state) {
    const sources = [];
    Object.keys(state).forEach(key => {
        const source = state[key].data && state[key].data.source && state[key].data.source.customSource;
        console.log('source: ', source);
        source && sources.push(state[key].data.source.customSource);
    });
    return sources;
}

class Help extends React.Component {

    constructor(props) {
        super(props);
        props.fetchSourcesData();
    }

    render() {
        return (
            <>
            <div className={styles.instructions}>
                <h1>Ultra v3 {pjson.version}</h1>
                <p>This software is developed on my spare time and is is provided for free, I made because I have fun
                    coding and like to help other streamers</p>
                <p>If you have any problems, questions, suggestions or recommendations to help us make this software
                    better, please let me know by filling this <a href={'https://google.com'}>support request magic
                        scroll</a>, this will go directly
                    to my e-mail, and you can add your contact information there if you so desire</p>
            </div>
            <div className={styles.instructions}>
                <h1>Keep this project alive</h1>
                <p>If you like this work and would like to help it keep going, feel free to
                    use the following <a href="https://twitch.com/romulinotv">donation link</a>, or simply show up at <a
                        href="https://streamlabs.com/romulinotv">my stream</a> to chat for a while, both would be very
                    appreciated</p>
            </div>
            <div className={styles.instructions}>
                <h1>Chat Bot & Connections</h1>
                <p>Select your streaming service on the side bar and authenticate with it to be able to see your
                    chats</p>
                <p>To activate Streamelements, paste it's authentication token on the specified text box, to activate
                    Streamlabs, simply enable it</p>
                <p>When you enable chat, the chatbot will send a greetings message on your chat to confirm it is
                    working.</p>
                <p>Multi-streaming works but is not supported (for now).</p>
            </div>
            <div className={styles.instructions}>
                <h1>Chat Apps</h1>
                <p>Apps are listed on the side menu.</p>
                <p>Enable and set up the apps you want to use, don't forget to save your settings.</p>
                <p>If you save settings while a chat bot is running, you need to restart it for the changes to take
                    effect.</p>
                <CollapsiblePanel collapsed title={'App Specific Instructions'}>
                    <h2>Chicken</h2>
                    <p>A chicken that can walk around the screen</p>
                    <h2>Icons</h2>
                    <p>Icons pop-up on your screen according to what the users type</p>
                    <h2>Loyalty</h2>
                    <p>Native loyalty system, designed to produce interactions between viewers</p>
                    <p>Viewers can gain two kinds of points, power and love</p>
                    <p>Viewers get power automatically as they interact on the stream</p>
                    <p>Viewers get love only when it's given to them by another viewer</p>
                    <p>Media can be played by spending love or power, according to settings</p>
                    <h2>Media</h2>
                    <p>Allows you and users to play media, can charge loyalty points from users, integrated to
                        Streamlabs, Streamelements and the native loyalty systems</p>
                    <h2>News</h2>
                    <p>Display news retrieved from RSS feeds, offers a command for the viewers to request a link to read
                        the news</p>
                </CollapsiblePanel>


            </div>
            <div className={styles.instructions}>
                <h1>Browser Sources: OBS / XSPLIT / ETC</h1>
                <p>All the apps will show up in the same source unless they are set up with a <strong>custom
                    source</strong></p>
                <p>Each custom source requires a browser source in your app</p>
                <p>All your sources urls will be displayed bellow, add them to your streaming app and size it in any way
                    you like</p>
                <ul>
                    <li>http://localhost:62619/scene</li>
                    {this.props.detectedSources.map((source, i) => {
                        return (<li key={i}>http://localhost:62619/scene?source={source} </li>)
                    })}
                </ul>
            </div>
            </>)
    }
}

function mapStateToProps(state) {
    return {
        ...state.authentication,
        hasUser: !!state.authentication.user,
        detectedSources: getDetectedSources(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSourcesData: () => {
            dispatch(mediaActions.fetch());
            dispatch(chickenActions.fetch());
            dispatch(iconsActions.fetch());
            dispatch(welcomeActions.fetch());
            dispatch(newsActions.fetch());
            dispatch(loyaltyActions.fetch());
            dispatch(quizActions.fetch());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);
