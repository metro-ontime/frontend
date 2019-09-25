const prodConfig = {
  RAILSTATS_API: '127.0.0.1:8080',
};

const devConfig = {
  RAILSTATS_API: 'http://localhost:8080',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
