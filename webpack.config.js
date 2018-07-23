//Webpack is used to reduce the number of requests on the client side so the page 
  //can load faster and won't take up that as many resources. It packages all of the assets, creates 
  //a single bundle that is output on the page. It also converts code into the formats needed. 
  //ref used: https://webpack.js.org, 
    //https://www.youtube.com/watch?v=ytRnPV0kRN0&list=PL4cUxeGkcC9iTQ3J5oa6orDIMQKKxl8dC
    //https://www.youtube.com/watch?v=uextYhQGP6k //https://www.youtube.com/watch?v=deyxI-6C2u4
    //https://www.youtube.com/watch?v=IR6smI_YJDE

//Dependencies
const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //Define the entry point where the initial file is
  entry: path.join(__dirname, '/client/src/app.js'),

  //Defines the output point, which is created automatically if not already there
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  //Defines the rules of how the file is bundled and dumped into the output point, see docs for webpack
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
  
  //Set to true to that webpack can watch for changes in any of the resolved files
  watch: true
};