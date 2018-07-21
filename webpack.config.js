const webpack = require('webpack');
const HtmlWebpackPlugin = reuire('html-webpack-plugin')
const path = require('path');

module.exports = {
    // Entry react file
    entry: path.join(__dirname, '/client/src/app.js'),
  
    // Output for compiled code
    output: {
      path: path.join(__dirname, '/client/dist'),
      filename: 'app_bundle.js',
    },
  
    module: {  
      // Apply rules to files that meet given conditions
      rules: [{
        test: /\.js$/,
        exclude: /node_module/,
        include: path.join(__dirname, '/client/src'),
        use: {
            loader: 'babel-loader',
        }
      }],
    }
  };