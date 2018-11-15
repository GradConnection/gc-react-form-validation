const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const SassPlugin = require('sass-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'GCReactFormValidation',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    publicPath: 'lib'
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
            presets: ['@babel/react', '@babel/preset-env'],
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
      { from: 'src/styles/styles.scss', to: './' }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
    // new SassPlugin('./src/styles/styles.scss')
  ]
}
