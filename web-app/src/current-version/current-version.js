import React from 'react';
const pjson = require('../../package.json');

export default function CurrentVersion() {
    return (
        <div><a href="https://romulino.com/baixar" target="__blank">Current version is: {pjson.version}</a></div>
    )
};
