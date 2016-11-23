const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'main': './src/client/demo/index.js',
    'rich-editors': './src/client/index.integration.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: '[name].bundle.js',
    library: 'react-[name]',
    libraryTarget: 'umd'
  },

  externals: {
    TermReferenceSearchDialog: 'TermReferenceSearchDialog',
    ProductReferenceSearchDialog: 'ProductReferenceSearchDialog',
  },

//  devtool: 'cheap-eval-source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(process.env.HOST ? process.env.HOST : 'localhost'),
      'process.env.PORT': JSON.stringify(process.env.PORT ? process.env.PORT : 3001)
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.jsx', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
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
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.less$/, loader: 'style!css!less'},
      {
        test: /.js?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src/client')
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
