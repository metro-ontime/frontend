const prodConfig = {
  RAILSTATS_API: process.env.RAILSTATS_API || 'http://railstats-frontend-1563011401.us-west-1.elb.amazonaws.com',
};

const devConfig = {
  RAILSTATS_API: 'http://localhost:8080',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
