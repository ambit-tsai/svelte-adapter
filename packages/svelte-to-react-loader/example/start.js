const path = require('path')
const ROOT = path.resolve(__dirname, './')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')


const compiler = webpack({
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    entry: `${ROOT}/main.jsx`,
    output: {
        path: `${ROOT}/dist/`,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    path.resolve(ROOT, '../src/index.js'),
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.svelte$/,
                loader: 'svelte-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${ROOT}/index.html`,
        }),
    ],
})


const server = new WebpackDevServer(compiler, {
    hot: true,
    open: true,
    transportMode: 'ws',
})


const PORT = 8080;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, err => {
    if (err) {
        console.log(err)
    }
});