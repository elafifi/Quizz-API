const { Router } = require('express');
const auth = require('../../middlewares/auth.js');
const Quiz = require('../../models/quiz.js');
const getQuizzesRouter = Router();

getQuizzesRouter.get('/quizzes', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({});

    if (!quizzes) {
      throw new Error('Error: no quizzes found');
    }

    const quizzesTitles = quizzes.map((quizz) => {
      return { title: quizz.title, _id: quizz._id };
    });

    res.status(200).send(quizzesTitles);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

module.exports = getQuizzesRouter;
//export { router as getQuizzesRouter };
