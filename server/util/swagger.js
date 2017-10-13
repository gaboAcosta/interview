
const chalk = require('chalk')
const Glob = require('glob');
const YAML = require('yamljs');
const path = require('path')
const fs = require('fs')
const baseDockPath = path.resolve(path.join(__dirname, '../base.swagger.yaml'))
const baseDoc = YAML.load(baseDockPath);

module.exports = (done) => {
    baseDoc.paths = {}
    baseDoc.definitions = {}
    baseDoc.tags = []

    Glob.sync('../routes/**/*.swagger.yaml', {
        realpath: true,
        cwd: __dirname,
    })
        .forEach((file) => {

            console.log('processing yaml file')
            console.log(file)
            const routeObj = YAML.load(file)
            console.log(routeObj)
            const { paths } = routeObj || {}
            const { definitions } = routeObj || {}
            const { tags } = routeObj || []


            Object.keys(paths).forEach((key) => {
                baseDoc.paths[key] = paths[key]
            })

            Object.keys(definitions).forEach((key) => {
                baseDoc.definitions[key] = definitions[key]
            })

            baseDoc.tags = baseDoc.tags.concat(tags)

        })

    const swaggerFilePath = path.resolve(path.join(__dirname, '../../dist/swagger.yaml'))

    fs.writeFileSync(swaggerFilePath, YAML.stringify(baseDoc))
    console.log(chalk.cyan('Swagger file successfully generated'));
}