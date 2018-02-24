const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    entry: './src/Scene/layout.js',
    output: {
        filename: 'libase.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'electron',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }/* ,
            {
                test: /\.sass$/,
                use: ['style-loader', 'resolve-url-loader','sass-loader']
            }, */
            , {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                        , options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: "sass-loader?sourceMap" // compiles Sass to CSS
                        , options: {
                            sourceMap: true
                        }
                    }]
            },
            {
                test: /\.svg$/,
                use: ['svg-url-loader']
            }
        ]
    }
}