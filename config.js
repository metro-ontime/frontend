const prodConfig = {
  RAILSTATS_API: 'https://api.railstats.org/network',
};

const devConfig = {
  RAILSTATS_API: 'http://localhost:8080/network',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
