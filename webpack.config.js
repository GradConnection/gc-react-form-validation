const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'GCReactFormValidation',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    publicPath: 'lib',
    globalObject: 'typeof self !== "undefined" ? self : this'
  },
  target: 'node', // https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/130#issuecomment-639233255
  devtool: 'source-map',
  mode: 'none', // "production" | "development" | "none"
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils.js'),
      translations: path.resolve(__dirname, 'src/translations.js'),
      ui: path.resolve(__dirname, 'src/components/UI/index.js')
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
            sourceMap: true,
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-optional-chaining', '@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'src/styles', to: './scss' }] })
  ]
};
