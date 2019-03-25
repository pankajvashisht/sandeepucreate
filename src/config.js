const dotenv = require('dotenv');

dotenv.load();
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: 2001,
    session: {
      secret: 'secret',
    },
    rollbarAccessToken: null,
    origin: 'http://localhost:3001',    
  },
  test: {
    port: 2000,
    session: {
      secret: 'secret',
    },
    rollbarAccessToken: null,    
    origin: 'https://domain.com',    
  },
  production: {
    port: process.env.PORT,    
    rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,        
    webUrl: process.env.WEB_URL,    
    origin: process.env.ORIGIN,    
  },
};

module.exports = config[env];
