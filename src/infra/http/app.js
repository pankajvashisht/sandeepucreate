const express = require('express');
const bodyParser = require('body-parser');

const { createUsersRoute } = require('./routes/users/index.js');
const { createDal } = require('../../dal/index.js');

const createApp = ({
  sequelize = {},
  dal,
}) => {
  dal = dal || createDal({ sequelize }); // eslint-disable-line no-param-reassign  
  const app = express();   
  app.use(bodyParser.json());

  const usersRoute = createUsersRoute({ dal });

  app.use('/users', usersRoute);
  return app;
};

module.exports = { createApp };
