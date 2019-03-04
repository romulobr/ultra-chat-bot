import React from 'react';
const pjson = require('../../package.json');

export default function CurrentVersion() {
    return (
        <div>Current version is: {pjson.version}</div>
    )
};
