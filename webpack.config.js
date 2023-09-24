const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    // devServer: {
    //     proxy: {
    //         '/assets': 'http://labs.phaser.io'
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: 'static/[name][contenthash][ext][query]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            title: 'phaser 入门'
        })
    ]
}