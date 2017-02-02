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
      { test: /\.jsx?$/, exclude: /node_modules/, query: {presets: [require.resolve('babel-preset-es2015'),
        require.resolve('babel-preset-react'),
        require.resolve('babel-preset-stage-1')]}, loader: "babel"},
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
};
