// shared config (dev and prod)
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //modules: true,
                            importLoaders: 1,
                            //localIdentName: '[sha1:hash:hex:16]',
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //modules: true,
                            importLoaders: 1,
                            //localIdentName: '[sha1:hash:hex:16]',
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
    performance: {
        hints: false,
    },
}
