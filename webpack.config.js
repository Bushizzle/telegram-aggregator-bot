const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = () => ({
  target: 'node',
  externals: [nodeExternals()], // ignore node_modules
  externalsPresets: {
    node: true, // ignore built-in modules like path, fs, etc.
  },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
});
