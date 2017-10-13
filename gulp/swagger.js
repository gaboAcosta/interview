
const gUtil = require('gulp-util')
const chalk = require('chalk')
const Glob = require('glob');
const YAML = require('yamljs');
const path = require('path')
const fs = require('fs')
const baseDockPath = path.resolve(path.join(__dirname, '../server/base.swagger.yaml'))
const baseDoc = YAML.load(baseDockPath);

module.exports = (gulp) => {
    gulp.task('swagger', () => {
        baseDoc.paths = {}
        baseDoc.definitions = {}
        baseDoc.tags = []

        Glob.sync('../server/routes/**/*.swagger.yaml', {
            realpath: true,
            cwd: __dirname,
        })
        .forEach((file) => {

            const routeObj = YAML.load(file)
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

        const swaggerFilePath = path.resolve(path.join(__dirname, '../dist/swagger.yaml'))

        fs.writeFileSync(swaggerFilePath, YAML.stringify(baseDoc, 10))
        gUtil.log(chalk.cyan('Swagger file successfully generated'));
    })
}