const {
  UniqueConstraintError,
} = require('sequelize');
const { AppError } = require('../common/errors');

class EmailAlreadyExistsError extends AppError {}

const createUserDal = ({
  sequelize: { models: { User, ResetPasswordToken, Session } = {} },
}) => {
  const create = async user => {
    try {
      const sequelizeUser = await User.create(user);      
      return getUserValues(sequelizeUser);
      
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new EmailAlreadyExistsError();
      }
      throw error;
    }
  };

  const getUserValues = sequelizeUser => {
    const user = sequelizeUser.get();
    delete user.password;
    return user;
  };

  const findByEmail = async email => {
    const sequelizeUser = await User.findOne({ where: { email } });

    if (!sequelizeUser) {
      return null;
    }

    return sequelizeUser.get();
  };
  
  return {
    create,    
    findByEmail,   
  };
};

module.exports = {
  createUserDal,
  errors: {    
    EmailAlreadyExistsError,    
  },
};
