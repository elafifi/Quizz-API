const app = require('./app.js');

const start = async () => {
  app.listen(process.env.PORT, () => {
    console.log('Listen to port 3000...');
  });
};

start();
