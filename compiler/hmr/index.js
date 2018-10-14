const querystring = require('querystring');
const overlayStyles = require('./overlay');

module.exports = {
  getClient() {
    const host = 'webpack-hot-middleware/client?';
    const query = querystring.stringify({
      path: '/__webpack_hmr',
      timeout: 20000,
      reload: true,
      overlay: true,
      noInfo: true,
      overlayStyles: JSON.stringify(overlayStyles)
    });

    return `${host}${query}`;
  }
}