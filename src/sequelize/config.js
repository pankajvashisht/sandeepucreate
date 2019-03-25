const { Op } = require('sequelize');
const dotenv = require('dotenv');


dotenv.load();
const operatorsAliases = Op; // https://github.com/sequelize/sequelize/issues/8417#issuecomment-355123149
const env = process.env.NODE_ENV || 'development';


const config = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    sync: false,
     // logging: text => console.log(highlightSql(format(text))), // eslint-disable-line no-console,
     logging: false,
    operatorsAliases,
    ssl: false,
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    sync: process.env.SYNC_DATABASE || false,
    logging: false,
    operatorsAliases,
    ssl: false,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    sync: false,
    logging: false,
    operatorsAliases,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};

module.exports = config;
module.exports.config = config[env];
