const express = require('express')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerGenerator = require('./util/swagger')
const routeGenerator = require('./util/routes')

swaggerGenerator()

const swaggerPath = path.resolve(path.join(__dirname, '../dist/swagger.yaml'))
let swaggerDocument

try {
    swaggerDocument = YAML.load(swaggerPath);
} catch(ex){
    throw new Error('swagger file missing, please run gulp swagger')

}

const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routeGenerator(app)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})