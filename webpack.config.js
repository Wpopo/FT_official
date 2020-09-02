const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/components/app'],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Constants: path.resolve(__dirname, 'src/components/constants/'),
      Common: path.resolve(__dirname, 'src/components/common/'),
      Lib: path.resolve(__dirname, 'src/lib/'),
      Style: path.resolve(__dirname, 'src/style/')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /(\.sass$|\.scss$)/,
        // loader: ExtractTextPlugin.extract("css?sourceMap!autoprefixer!sass")
        loader: ExtractTextPlugin.extract('css?sourceMap!sass')
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader?limit=1024&name=[path][name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/i,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('style/main.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  devServer: {
    disableHostCheck: true
    //historyApiFallback: true // 開發專用，讓找不到頁面時全fallback到index.html，這是在有使用react-router的BrowserRouter才需要的設定
  }
};
