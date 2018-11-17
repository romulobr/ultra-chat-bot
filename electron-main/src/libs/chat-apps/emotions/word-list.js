const fs = require('fs');
const path = require('path');

function readFile(file) {
  return fs.readFileSync(path.resolve(__dirname, file), 'utf8').split('\n').filter(word => word !== '');
}

const admiration = readFile('admiration.txt');
const amazement = readFile('amazement.txt');
const ecstasy = readFile('ecstasy.txt');
const grief = readFile('grief.txt');
const loathing = readFile('loathing.txt');
const rage = readFile('rage.txt');
const terror = readFile('terror.txt');
const vigilance = readFile('vigilance.txt');
const love = readFile('love.txt');

const wordList = {
  admiration,
  amazement,
  ecstasy,
  grief,
  loathing,
  rage,
  terror,
  vigilance,
  love
};

module.exports = wordList;
