const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './LitElemComp/src/index.js',
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, 'LitElemComp/dist')
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/proposal-decorators', { decoratorsBeforeExport: true } ],
            ]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    publicPath: '/LitElemComp/dist',
    compress: true,
    hot: true,
    port: 9000
  },
};