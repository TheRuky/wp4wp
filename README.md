# wp4wp

⚠ **Requires [Node](https://nodejs.org/en/) 8.5.0 or greater.**

Let's say your theme name is **xyz** and it's located in `wp-content/themes/xyz`. Bundler root (where `package.json` is) should be put in **a subfolder**, for example `resources`. So, path to `package.json` would be `wp-content/themes/xyz/resources/package.json`.

Compiler will use `wp-content/themes/xyz/assets` as a root for output. All files will be in their respective folders (for example, styles will be in `wp-content/themes/xyz/assets/styles`).

In bundler root, first, run `yarn install` to install all the dependencies and then run `yarn serve` or `yarn start` for development environment (Webpack + BrowserSync) or `yarn build` for the production build.

> NOTE: If you don't have [Yarn](https://yarnpkg.com/en/), use `npm install`, `npm run serve` and `npm run build`. Or, if you want to have Yarn, use `npm install -g yarn` to install it globally for future use.

**Minimal** configuration can be done in `compiler/config.js`. Change the proxy target to the location of the WordPress site you want BrowserSync to proxy in development mode. BrowserSync will create proxy on `localhost:3000` or the first available port after that, if 3000 is taken.
