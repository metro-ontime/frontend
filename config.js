const prodConfig = {
  RAILSTATS_API: 'https://api.railstats.org',
};

const devConfig = {
  RAILSTATS_API: 'http://localhost:8080',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
