const webpack = require('webpack');
const config = require('./webpack.config')({ dev: false });

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  if (stats.hasErrors()) {

    console.error(stats.toString({
      all: false,
      colors: true,
      errors: true
    }));

    console.log();

    return;
  }

  if (stats.hasWarnings()) {
    console.warn(stats.toString({
      all: false,
      colors: true,
      errors: true
    }));
  }

  console.log(stats.toString({
    colors: true,
    chunks: false,
    modules: false,
    entrypoints: false,
    children: false
  }));

  console.log();
});