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
    preLoaders: [
        //Eslint loader
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"},
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot","babel-loader"]},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['react-hot','style-loader']
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['react-hot','css-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  },
};
