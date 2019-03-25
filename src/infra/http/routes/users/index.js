const { Router } = require('express');
const { createNewUserRoute } = require('./new.js');

const createUsersRoute = ({
  dal,
}) => {
  const router = new Router();

  createNewUserRoute({ router, dal });
  return router;
};

module.exports = { createUsersRoute };
