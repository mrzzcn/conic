const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJson = require('./package.json');
const mode = process.env.NODE_ENV || 'development';
const config = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `bundle-${packageJson.version}.js`
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 7000,
    open: true
  },
  mode,
  module: {
    rules: [{
        test: /\.(ts)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  plugins: []
}

console.log(mode)
if (mode === 'development') {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    inject: true
  }));
} else {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: '../index.html',
    template: 'src/index.html',
    inject: true
  }));
}

module.exports = config;