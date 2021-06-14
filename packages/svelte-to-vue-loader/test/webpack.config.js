
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        optimizeSSR: false,
                    },
                },
            },
            {
                test: /\.svelte$/,
                loader: 'svelte-loader',
            },
            {
                test: /\.js$/,
                loader: path.resolve(__dirname, '../src/index.js'),
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}
