const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'rich-editors': './src/client/index.integration.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: '[name].bundle.min.js',
    library: 'react-[name]',
    libraryTarget: 'umd'
  },


  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },

  bail: true,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        // don't show unreachable variables etc
        warnings: false,
        drop_console: true,
        unsafe: true
      }
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
        test: /\.css$/, loader: "style-loader!css-loader"
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
