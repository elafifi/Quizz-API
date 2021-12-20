const { Router } = require('express');
const auth = require('../../middlewares/auth.js');
const teacherAuth = require('../../middlewares/teacherAuth.js');
const Quiz = require('../../models/quiz.js');
const createQuizzRouter = Router();

createQuizzRouter.post(
  '/quizzes/create',
  auth,
  teacherAuth,
  async (req, res) => {
    try {
      const quizz = new Quiz(req.body);
      quizz.owner = req.user._id;
      await quizz.save();

      res.status(201).send(quizz);
    } catch (e) {
      res.status(400).send({
        error: e.message,
      });
    }
  }
);

module.exports = createQuizzRouter;

//export { router as createQuizzRouter };
