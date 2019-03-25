const { createUserDal } = require('./user.js');


const createDal = ({ sequelize }) => {
  const userDal = createUserDal({ sequelize });  

  return {
    userDal,    
  };
};

module.exports = { createDal };
