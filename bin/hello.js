#!/usr/bin/env node

const commander = require('commander')
const alphabetjs = require('alphabetjs')
const chalk = require('chalk')
const title = alphabetjs('hellocli','stereo')
const packageInfo = require('../package.json')

commander.addHelpText('beforeAll', chalk.greenBright(title));

commander
    .usage("[options]/[command]")
    .description('Hello World')
    .version(packageInfo.version)
    .command('create', 'Create an project')
    .parse(process.argv);
