var path = require('path')
module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/index.jsx",
  },

  output: {
    path: __dirname + "/static",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, query: {presets: [['es2015'], ['react'], ['stage-1']]}, loader: "babel-loader"},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader']
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['css-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
