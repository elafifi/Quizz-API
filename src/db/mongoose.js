const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('mongodb connected successfully...');
  })
  .catch((e) => {
    throw new Error('Error: mongodb connection is failed', e);
  });
