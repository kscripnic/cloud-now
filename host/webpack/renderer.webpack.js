module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: require('./rules.webpack'),
  },
  externals: {
    // Always load `native-hello-world` via require
    robotjs: 'commonjs2 robotjs',
  },
}
