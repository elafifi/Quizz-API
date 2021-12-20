const { Router } = require('express');
const auth = require('../../middlewares/auth.js');
const teacherAuth = require('../../middlewares/teacherAuth.js');
const Quiz = require('../../models/quiz.js');
const addQuestionRouter = Router();

addQuestionRouter.post('/quizzes/:id', auth, teacherAuth, async (req, res) => {
  try {
    const quizz = await Quiz.findOne({
      _id: req.params.id,
    });

    if (!quizz) {
      throw new Error('Error: no quizzes found with this id');
    }

    if (req.user._id != quizz.owner.toString()) {
      throw new Error('Error: sorry, this quizz belongs to another teacher');
    }

    quizz.questions.push(req.body);

    await quizz.save();

    res.status(201).send(quizz);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});
module.exports = addQuestionRouter;
//export { router as addQuestionRouter };
