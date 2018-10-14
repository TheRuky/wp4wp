module.exports = ({ options }) => ({
  plugins: {
    'autoprefixer': {},
    'postcss-preset-env': {},
    'css-mqpacker': {},
    'cssnano': options.dev ? false : {
      preset: ['default', {
        discardComments: { removeAll: true }
      }]
    }
  }
});