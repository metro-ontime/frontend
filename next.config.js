module.exports = {
  assetPrefix: process.env.NODE_ENV === 'GH_PAGES' ? '/frontend' : '',
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
}
