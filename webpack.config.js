const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    devServer: {
        publicPath: '/',
        open: true,
        port: 9000,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.sass']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(s[ac]ss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: 'postcss.config.js'
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|png|gif|webp|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',
        }),
        new Dotenv()
    ]
}