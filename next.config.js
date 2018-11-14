module.exports = {
  assetPrefix: process.env.NODE_ENV === 'GH_PAGES' ? '/frontend' : '',
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      })
    }
    return config
  }
}
