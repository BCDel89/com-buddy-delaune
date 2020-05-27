#!/usr/bin/env node

const {get} = require('lodash');
const {argv} = require('yargs');
const {execSync} = require('child_process');
const packageData = require('../package.json');

const isSmokeTest = !!argv.smokeTest;
const packageVersion = packageData.version;
const tagName = 'v' + packageVersion;
const releaseBranchName = 'release/' + tagName;

const git = (cmd) => {
	const gitCmd = 'git ' + cmd;
	console.log('> ' + gitCmd);
	return isSmokeTest ? 0 : execSync(gitCmd, {stdio: 'inherit'});
};

if (!argv.buildPath) {
	console.error('buildPath argument required!', argv);
	process.exit(0);
}

process.chdir(argv.buildPath);
const result = execSync('pwd', {stdio: 'pipe'});
console.log('result: ', result.toString());

const currentBranchNamePattern = /On branch ([\S]+)/g;

const gitStatusOutput = execSync('git status').toString().trim();
const currentBranchName = get(currentBranchNamePattern.exec(gitStatusOutput), '[1]', null);

if (!currentBranchName) {
	console.error('failed to find current branch!');
	process.exit(1);
}

console.log('>>> -------- RELEASE CHECKPOINT FROM "' + currentBranchName + '" -------- <<<');

git('stash');
git('checkout -b ' + releaseBranchName);
git('stash apply');
git('add --all');
git('commit -m "' + tagName + '"');
git('tag ' + tagName);
git('push origin --tags ' + releaseBranchName);
git('checkout ' + currentBranchName);
git('merge ' + releaseBranchName);
git('push origin ' + currentBranchName);

console.log('>>> ------------ RELEASE CHECKPOINT DONE ------------ <<<');
