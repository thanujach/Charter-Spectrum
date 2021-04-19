const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = (_env, argv) => {

    return merge([
        {
            entry: ['@babel/polyfill', './polyfills.js', APP_DIR],
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    },
                    {
                        test: /\.(svg|png|jpg|gif)$/i,
                        use: {
                            loader: "url-loader",
                            loader: 'svg-url-loader',
                            options: {
                                limit: 8192,
                                name: "static/media/[name].[hash:8].[ext]"
                            }
                        }
                    },

                    {
                        test: /\.(sass|scss|css)$/,
                        use: [

                            argv.mode === 'production'
                                ? MiniCssExtractPlugin.loader : "style-loader",
                            "css-loader",
                            'sass-loader'
                        ]
                    },

                    {
                        test: /\.(eot|otf|ttf|woff|woff2)$/,
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "static/media/[name].[hash:8].[ext]"
                        }
                    }
                ]
            },
            resolve: {
                extensions: [".js", ".jsx"]
            },
            plugins: [
                argv.mode === "production" &&
                new MiniCssExtractPlugin({
                    filename: "[name].[contenthash:8].css",
                    chunkFilename: "[name].[contenthash:8].chunk.css"
                }),

                new HtmlWebpackPlugin({
                    template: './public/index.html',
                    filename: './index.html',
                    inject: true
                }),
                new webpack.DefinePlugin({
                    "process.env.NODE_ENV": JSON.stringify(argv.mode)
                }),
                // new CopyPlugin({
                //     options: {
                //         concurrency: 100,
                //     },
                // }),
            ].filter(Boolean),
            optimization: {
                minimize: false,
                minimizer: [
                    new TerserWebpackPlugin({
                        terserOptions: {
                            compress: {
                                comparisons: false
                            },
                            mangle: {
                                safari10: true
                            },
                            output: {
                                comments: false,
                                ascii_only: true
                            },
                            warnings: false
                        }
                    }),
                    new OptimizeCssAssetsPlugin()
                ]
            },
            devServer: {
                compress: true,
                historyApiFallback: true,
                open: true,
                overlay: true
            },
            performance: {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            },


            output: {
                publicPath: '',
                filename: '[name].[chunkhash].js'

            }
        }
    ]);

};