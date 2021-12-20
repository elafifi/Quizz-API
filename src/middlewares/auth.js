const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const auth = async function (req, res, next) {
  try {
    if (!req.session || !req.session.jwt) {
      throw new Error('Error: Not Authenticate to access this site');
    }

    const decoded = jwt.verify(req.session.jwt, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('Error: Not Authenticate to access this site');
    }
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

module.exports = auth;
