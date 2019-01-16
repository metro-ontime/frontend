const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'GH_PAGES' ? '/frontend' : '',
};

module.exports = withCSS(withSASS(baseConfig));
