
const gUtil = require('gulp-util')
const chalk = require('chalk')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const serverFactory = require('./util/server.factory')

const swaggerPath = path.resolve(path.join(__dirname, '../dist/swagger.yaml'))
let swaggerDocument

try {
    swaggerDocument = YAML.load(swaggerPath);
} catch(ex){
    throw new Error('swagger file missing, please run gulp swagger')

}

const app = serverFactory()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(3000, function () {
    gUtil.log(chalk.cyan('App listening on port 3000'));
})