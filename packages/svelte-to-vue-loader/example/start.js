const path = require('path')
const ROOT = path.resolve(__dirname, './')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')


const compiler = webpack({
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    entry: `${ROOT}/main.js`,
    output: {
        path: `${ROOT}/dist/`,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.svelte$/,
                loader: 'svelte-loader',
            },
            {
                test: /\.js$/,
                loader: path.resolve(ROOT, '../src/index.js'),
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: `${ROOT}/index.html`,
        }),
    ],
})


const server = new WebpackDevServer(compiler, {
    transportMode: 'ws',
    open: true,
    hot: true,
})

const PORT = 8080
const HOST = '127.0.0.1'

server.listen(PORT, HOST, err => {
    if (err) {
        console.log(err)
    }
})
