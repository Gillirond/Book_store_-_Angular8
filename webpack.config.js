const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
    path: {
        app: 'public/src/app',
        bundle: 'public/src/bundle'
    }
};

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8080
    },
    entry: {
        'polyfills.js': './public/src/polyfills.ts',
        'app.js': './public/src/main.ts',
        'app': './' + config.path.app + '/scss/index.scss'
    },
    output:{
        path: path.resolve(__dirname, './' + 'assets'),
        publicPath: '/' + config.path.bundle + '/',
        filename: "[name]"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    } ,
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'raw-loader'
            }, {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'public/src'),
            {}
        ),
        new MiniCssExtractPlugin({
            filename: "[name].min.css"
        })
    ]
}