const { Router } = require('express');
const User = require('../../models/user.js');

const signinRouter = Router();

signinRouter.post('/signin', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    req.session = {
      jwt: token,
    };

    res.status(200).send({ user });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = signinRouter;
// export { router as signinRouter };
