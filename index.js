const express = require('express');
const { createUsersRoute } = require('./src/infra/http/routes/users/index.js');

const createApp = ({    
  dal,  
}) => {
  const app = express();

  const usersRoute = createUsersRoute({ dal });
  
  app.use(bodyParser.json());
  app.use(bodyParserJsonError());

  app.use('/users', usersRoute); 

  return app;
};

module.exports = { createApp };
