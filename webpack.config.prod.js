var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [

    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.css$/,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!sass-loader'
    },
        {
  test: /\.(jpg|png|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 25000,
  },
},
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?.*$|$)/,
              loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
     { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?.*$|$)/, loader: 'file-loader' },
    ]
  }
    ]
  }
};
