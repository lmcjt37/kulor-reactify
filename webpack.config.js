const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "./index.html"
});

const DIST_DIR = path.join(__dirname, 'dist');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: { 
    modules: ['node_modules', 'src'], 
    extensions: ['.js', '.jsx', '.scss'] 
  },
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: 9000
  }
};