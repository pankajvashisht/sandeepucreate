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
      hooks: {
        beforeCreate: async instance => {
          const password = instance.get('password');
          if (password) {
            const hash = await hashPassword(password);
            instance.set('password', hash);
          }

          const email = instance.get('email');
          instance.set('email', email.toLowerCase());
        },
        beforeUpdate: async instance => {
          if (instance.changed('password')) {
            const password = instance.get('password');
            const hash = await hashPassword(password);
            instance.set('password', hash);
          }

          if (instance.changed('email')) {
            const email = instance.get('email');
            instance.set('email', email.toLowerCase());
          }
        },
      },
    },
  );

  return User;
};

module.exports = {
  createUserModel,
};
