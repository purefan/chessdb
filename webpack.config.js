const path = require('path')
// src/views/main.js dist/vogula.js

module.exports = {
    entry: './src/views/main.js',
    output: {
        filename: 'vogula.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: ['svg-url-loader']
            }
        ]
    }
}