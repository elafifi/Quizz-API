const { Router } = require('express');
const auth = require('../../middlewares/auth.js');

const signoutRouter = Router();

signoutRouter.post('/signout', auth, (req, res) => {
  req.session = null;
  req.user = null;
  res.status(200).send({ message: 'Bye Bye..' });
});

module.exports = signoutRouter;
//export { router as signoutRouter };
