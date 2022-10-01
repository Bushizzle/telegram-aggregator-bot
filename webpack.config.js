const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = () => ({
  target: 'node',
  externals: [nodeExternals()], // ignore node_modules
  externalsPresets: {
    node: true, // ignore built-in modules like path, fs, etc.
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules|dist/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.ts',
    libraryTarget: 'commonjs2',
  },
});
