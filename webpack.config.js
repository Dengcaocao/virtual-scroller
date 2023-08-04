// eslint-disable-next-line no-undef
const path = require('path')
// eslint-disable-next-line no-undef
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line no-undef
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// eslint-disable-next-line no-undef
const ESLintPlugin = require('eslint-webpack-plugin')
// eslint-disable-next-line no-undef
module.exports = {
  entry: './src/main.js',
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'libs'),
    filename: 'js/[name].[contenthash:10].js',
    chunkFilename: 'js/chunk-[name].[contenthash:10].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env']
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.js$/i,
        // eslint-disable-next-line no-undef
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:10].css',
      chunkFilename: 'css/chunk-[name].[contenthash:10].css'
    }),
    new CssMinimizerPlugin(),
    new ESLintPlugin({
      // eslint-disable-next-line no-undef
      context: path.resolve(__dirname, './src'),
      exclude: 'node_modules'
    })
  ],
  mode: 'production'
}
