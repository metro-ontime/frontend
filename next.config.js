const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'GH_PAGES' ? '/frontend' : '',
  webpack: (config, { dev }) => {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js');
      }
      return entries;
    };
    // if (dev) {
    //   config.module.rules.push({
    //     test: /\.(jsx?|js)$/,
    //     loader: 'eslint-loader',
    //     exclude: ['/node_modules/'],
    //     enforce: 'pre'
    //   })
    // }

    return config;
  }
};

module.exports = withCSS(withSASS(baseConfig));
