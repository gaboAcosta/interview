const path = require('path')
const webpack = require('webpack')

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
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: {
            index: 'index.html'
        },
        proxy: {
            '/api': {
                target: 'http://gateway:3000',
                secure: false
            }
        },
        contentBase: path.join(__dirname, 'public')
    }
}