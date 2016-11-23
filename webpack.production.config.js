const path = require('path');
const webpack = require('webpack');
const packageVersion = require('./package.json').version;

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

  bail: true,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
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
