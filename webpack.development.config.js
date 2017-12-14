const path = require('path');
const webpack = require('webpack');
const PACKAGE_VERSION = require('./package.json').version;

module.exports = {
  entry: {
    'main': './src/client/demo/index.js',
    'rich-editors': './src/client/index.integration.js'
  },
  output: {
    publicPath: '/static',
    path: path.resolve(__dirname, 'build/client'),
    filename: '[name].bundle.js',
    library: 'react-[name]',
    libraryTarget: 'umd'
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify(process.env.HOST ? process.env.HOST : 'localhost'),
      'process.env.PORT': JSON.stringify(process.env.PORT ? process.env.PORT : 3001)
    })
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
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
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: `[name]__[local]__${PACKAGE_VERSION}_[hash:base64:3]`,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: path.resolve(__dirname, './postcss.config.js')
            }
          },
          { loader: 'less-loader', options: { sourceMap: true } }
        ],
        include: /\.module\.(css|less)$/
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              config: path.resolve(__dirname, './postcss.config.js')
            }
          },
          { loader: 'less-loader', options: { sourceMap: true } }
        ],
        exclude: /\.module\.(css|less)$/
      },
      {
        test: /.js$/,
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
