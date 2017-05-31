'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'main': './src/client/demo/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].bundle.js',
    library: 'react-[name]',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(process.env.HOST ? process.env.HOST : 'localhost'),
      'process.env.PORT': JSON.stringify(process.env.PORT ? process.env.PORT : 3001)
    })
  ],

  resolve: {
    root: path.join(__dirname, "node_modules"),
    fallback: [path.join(__dirname, "node_modules")],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.jsx', '.js']
  },

  resolveLoader: {
    fallback: [path.join(__dirname, "node_modules")],
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  postcss: function () {
    return [require('autoprefixer')];
  },

  module: {
    loaders: [
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test   : /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(css|less)$/,
        loader: `style!css?modules&importLoaders=1&` +
        `localIdentName=[name]__[local]__${packageVersion}_[hash:base64:3]` +
        `!postcss-loader!less?sourceMap`,
        include: /\.module\.(css|less)$/
      },
      {
        test: /\.(css|less)$/,
        loader: `style!css!postcss-loader!less?sourceMap`,
        exclude: /\.module\.(css|less)$/
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src/client'),
          path.join(__dirname, 'server')
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
