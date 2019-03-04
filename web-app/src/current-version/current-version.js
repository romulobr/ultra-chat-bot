import React from 'react';

const pjson = require('../../package.json');

export default function CurrentVersion() {
    return (
        <div>
            <p><a href="https://romulino.com/baixar" target="__blank">Current version is: {pjson.version}</a></p>
            <p>Created and Developed by <a href="https://twitch.tv/romulinotv" target="__blank">romulinoTV</a></p>
        </div>
    )
};
