#!/usr/bin/env node

const {argv} = require('yargs');
const {toString} = require('lodash');
const {run} = require('./exec-util');

run('npm version --no-git-tag-version --allow-same-version ' + toString(argv.releaseAs));
