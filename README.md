# wp4wp

Let's say your theme name is **xyz** and it's located in `wp-content/themes/xyz`. Bundler root (where `package.json` is) should be put in **a subfolder**, for example `resources`. So, path to `package.json` would be `wp-content/themes/xyz/resources/package.json`.

Compiler will use `wp-content/themes/xyz/assets` as a root for output. All files will be in their respective folders (for example, styles will be in `wp-content/themes/xyz/assets/styles`).
