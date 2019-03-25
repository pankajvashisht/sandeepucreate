require('newrelic');

const { port } = require('./config.js');
const { createSequelize } = require('../src/sequelize/index.js');
const { createApp } = require('./infra/http/app.js');

(async () => {
  const sequelize = await createSequelize();
  const app = createApp({
    sequelize,
  });

  const server = app.listen(port, () => {
    console.info(`Listening on ${port}`); // eslint-disable-line no-console
  });

  const cleanUp = async () => {
    try {
      await Promise.all([
        sequelize.close(),
        server.close(),
      ]);
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  };
  process.on('SIGINT', cleanUp);
  process.on('SIGTERM', cleanUp);
})();
