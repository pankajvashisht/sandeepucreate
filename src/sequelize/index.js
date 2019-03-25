const Sequelize = require('sequelize');
const { createUserModel } = require('./models/user.js');

const { config } = require('./config.js');

const createSequelize = async ({
  url,
  sync,
  logging,
  operatorsAliases,
  ssl,
  dialectOptions,
} = config) => {  

  // initialize the connection
  const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    logging,
    operatorsAliases,
    ssl,
    dialectOptions,
  });

  // create models
  const User = createUserModel(sequelize, Sequelize);
  const models = {
    User,    
  };

  // associate models
  Object.values(models).forEach(model => {
    if (typeof model.associate !== 'function') {
      return;
    }
    model.associate(models);
  });

  if (sync) {
    await sequelize.sync({ force: true });
  }

  return {
    db: sequelize,
    models,
    close: () => sequelize.connectionManager.close(),    
  };
};

module.exports = {
  createSequelize,
};
