const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config({path: './.env'});
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: { rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }
    ]},
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Qualità della vita',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new Dotenv()
    ],
    devServer: {
        port: 5000,
        open: true,
        static: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    resolve: {
        fallback: {
          path: require.resolve('path-browserify'),
          crypto: require.resolve("crypto-browserify"),
          os: require.resolve("os-browserify/browser"),
          buffer: require.resolve("buffer/"),
          stream: require.resolve("stream-browserify"),
          fs: false
        }
      }
}