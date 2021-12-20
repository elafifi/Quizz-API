const teacherAuth = async function (req, res, next) {
  try {
    if (req.user.job !== 'teacher') {
      throw new Error('you should be teacher to access this command');
    }
    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

module.exports = teacherAuth;
