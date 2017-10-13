
const chalk = require('chalk')
const Glob = require('glob');
const YAML = require('yamljs');
const path = require('path')
const fs = require('fs')
const baseDockPath = path.resolve(path.join(__dirname, '../base.swagger.yaml'))
const baseDoc = YAML.load(baseDockPath);

module.exports = (app) => {
    baseDoc.paths = {}
    baseDoc.definitions = {}
    baseDoc.tags = []

    Glob.sync('../routes/**/*.route.js', {
        realpath: true,
        cwd: __dirname,
    })
    .forEach((file) => {

        app.use('/api/v1', require(file))

    })

    console.log(chalk.cyan('Routes correctly loaded'));
}