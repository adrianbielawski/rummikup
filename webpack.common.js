const path = require('path');

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'src/tsx'),
            path.join(__dirname, 'assets'),
            'node_modules'
        ],
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)$/,
              loader: "ts-loader",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:3]',
                                exportLocalsConvention: 'dashes',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|mp3)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
    plugins: [
        new FaviconsWebpackPlugin("./assets/img/icon.png"),
    ],
};