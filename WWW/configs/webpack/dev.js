// development config
const {merge} = require('webpack-merge')
const webpack = require('webpack')
const commonConfig = require('./common')
const { resolve } = require('path')

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        '@babel/polyfill',
        'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
        'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
        './index.tsx', // the entry point of our app
    ],
    devtool: 'cheap-module-source-map',
    plugins: [
    ],
    output: {
        filename: 'js/bundle.[fullhash].min.js',
        path: resolve(__dirname, '../../../dist'),
        publicPath: '/',
    },
})
