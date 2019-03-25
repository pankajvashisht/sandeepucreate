module.exports = {
  up: (queryInterface, { STRING, UUIDV4, UUID }) =>
    queryInterface.createTable('User', {
      userId: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },      
      firstName: {
        type: STRING,        
      },
      password: {
        type: STRING,
        allowNull: true,
      },
    }),
  down: queryInterface => queryInterface.dropTable('User'),
};
