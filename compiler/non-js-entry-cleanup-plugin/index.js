const path = require('path');
const minimatch = require('minimatch');

module.exports = class {
  constructor(options) {
    // TODO: Smarter options handling.
    this.options = options;
  }

  apply(compiler) {
    const { context, extensions, includeSubfolders } = this.options;

    compiler.hooks.emit.tapAsync('NonJsEntryCleanupPlugin', (compilation, callback) => {
      const pattern = path.join(context, `${includeSubfolders ? '**/' : ''}*.${extensions}`);

      Object.keys(compilation.assets).filter(asset => minimatch(asset, pattern)).forEach(asset => delete compilation.assets[asset]);

      callback();
    });
  }
}