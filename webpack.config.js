const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|svg|ico|png|geojson|csv)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      "~": __dirname
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CompressionPlugin()
  ]
}
