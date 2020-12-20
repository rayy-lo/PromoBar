const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/PromoBar.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  output: {
    filename: 'PromoBar.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      title: "PromoBar Web Component",
      inject: false,
      templateContent: ({htmlWebpackPlugin}) => `
        <html>
            <head>
                ${htmlWebpackPlugin.tags.headTags}
            </head>
            <body>
                <promo-bar></promo-bar>
                ${htmlWebpackPlugin.tags.bodyTags}
            </body>
        </html>
      `
  })]
};