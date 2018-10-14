const path = require('path');

module.exports = (folder, prefix = '') => {
  const theme = path.basename(path.resolve('../'));
  return `${prefix}/wp-content/themes/${theme}/${folder}/`;
}