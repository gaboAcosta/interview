const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'css-loader'}
        ]
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'public')
    }
}