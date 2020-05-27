#!/usr/bin/env node
const {execSync} = require('child_process');

const run = (cmd) => {
	console.log('> ' + cmd);
	return execSync(cmd, {stdio: 'inherit'});
};

module.exports = {
	run: run
};
