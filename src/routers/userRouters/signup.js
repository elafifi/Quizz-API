const { Router } = require('express');
const User = require('../../models/user.js');

const signupRouter = Router();

signupRouter.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    const token = await user.generateAuthToken();

    req.session = {
      jwt: token,
    };
    res.status(201).send({ user });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
});

module.exports = signupRouter;
//export { router as signupRouter };
