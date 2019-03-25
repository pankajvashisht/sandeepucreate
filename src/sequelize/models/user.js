const bcrypt = require('bcrypt');

const hashPassword = password => bcrypt.hash(password, 10);

const createUserModel = (sequelize, { STRING, UUIDV4, UUID }) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },     
      firstName: {
        type: STRING,
      },
      password: {
        type: STRING,
        allowNull: true,
      },      
    },
    {
      freezeTableName: true,
      timestamps: false,      
    },
  );

  return User;
};

module.exports = {
  createUserModel,
};
