const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        assetModuleFilename: 'images/[name].[hash].[ext]'
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)/,
                // use: {
                //     loader: "file-loader",
                //     options: {
                //         name: "[name].[hash].[ext]",
                //         outputPath: "imgs"
                //     }
                // }

                // in webpack 5 use type: 'asset/resource' in order to resolve asset and no need more loader 
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: { "@dev": path.resolve(__dirname, "src") }
    },
};

