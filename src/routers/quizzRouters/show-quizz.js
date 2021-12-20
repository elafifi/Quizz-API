const { Router } = require('express');
const auth = require('../../middlewares/auth.js');
const Quiz = require('../../models/quiz.js');
const showQuizzRouter = Router();

showQuizzRouter.get('/quizzes/:id', auth, async (req, res) => {
  try {
    let quizz = await Quiz.findOne({
      _id: req.params.id,
    });

    if (!quizz) {
      throw new Error('Error: no quizzes found with this title');
    }
    if (req.user.job === 'student' || req.user._id != quizz.owner.toString()) {
      quizz.questions = quizz.questions.map((q) => {
        const answers = q.answers;
        return {
          _id: q._id,
          title: q.title,
          question: q.question,
          answerType: q.answerType,
          answers,
        };
      });
    }
    res.status(200).send(quizz);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

module.exports = showQuizzRouter;
//export { router as showQuizzRouter };
