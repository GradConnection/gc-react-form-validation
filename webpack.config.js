const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'GCReactFormValidation',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js'
  },
  devtool: 'source-map',
  mode: 'none',
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils.js'),
      translations: path.resolve(__dirname, 'src/translations.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-optional-chaining']
          }
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/styles.scss', to: './' }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]

}
