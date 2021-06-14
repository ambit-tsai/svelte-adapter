const path = require('path')
const ROOT = path.resolve(__dirname, './')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


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
    resolve: {
        // // see below for an explanation
        // alias: {
        //     svelte: path.resolve('node_modules', 'svelte'),
        // },
        // extensions: ['.mjs', '.js', '.svelte'],
        // mainFields: ['svelte', 'browser', 'module', 'main']
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: `${ROOT}/index.html`,
        }),
    ],
    devServer: {
        hot: true,
        open: true,
    },
})


compiler.run((err, stats) => {
    if (err) {
        console.log(err)
    } else if (stats.hasErrors()) {
        console.log(stats.compilation.errors)
    }
})