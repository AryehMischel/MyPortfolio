const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './public/app.js',  // Entry point for your application
  output: {
    filename: 'bundle.js',    // The name of the output file
    path: path.resolve(__dirname, 'public'),  // Where to save the bundle.js file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel to transpile your JS files
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Serve files from the 'public' directory
    port: 3000, // The port to serve the content on
  },
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
  mode: 'production', // Use 'production' for optimized code in production
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    usedExports: true, // Enable tree-shaking
  },
};