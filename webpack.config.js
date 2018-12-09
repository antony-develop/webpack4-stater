const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => {
    const prodMode = options.mode == 'production';
    
    return {
        entry: './src/js/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'main.js',
            // publicPath: 'dist/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                "includePaths": [
                                    require('path').resolve(__dirname, 'node_modules')
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.(jpg|png|svg|git)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/'
                        }
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'main.css'
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new CleanWebpackPlugin(['dist'])
        ],
        devtool: (prodMode) ? 'source-map' : 'eval-sourcemap'
    }
}
