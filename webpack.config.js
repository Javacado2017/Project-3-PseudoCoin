// CREATE WEBPACK SETUP 
  // Used to reduce the number of requests on the client side to reduce resources spend by 
  // packaging assets and creating a single bundle that is output on the page. Also,   
  // recognizes when to re-bundle when changes are made to local areas of the code. 
// REFERENCES: https://webpack.js.org
    //https://www.youtube.com/watch?v=ytRnPV0kRN0&list=PL4cUxeGkcC9iTQ3J5oa6orDIMQKKxl8dC

// DEPENDENCY FUNCTIONS: 
const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

// ENTRY AND OUPUT FUNCTIONS: 
module.exports = {
  // Defines the entry point
  entry: path.join(__dirname, '/client/src/app.js'),

  // Defines the output point
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  // Defines the rules of how the client side files are bundled and dumped into the output point
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_module)/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: '.server/public/index.html'
  //   })
  // ],
  
  // Trigers to re-bundle when changes are made on the client side
  watch: true
};