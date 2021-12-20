const { Router } = require('express');
const evaluateAnswer = require('../../helpers/evaluate-answer.js');
const auth = require('../../middlewares/auth.js');
const Quiz = require('../../models/quiz.js');
const answerQuizzRouter = Router();

answerQuizzRouter.post('/quizzes/:id/answer', auth, async (req, res) => {
  try {
    const answerBody = req.body;
    const quizz = await Quiz.findOne({ _id: answerBody._id });
    const studentAnswers = answerBody.answers;

    const grade = evaluateAnswer(quizz.questions, studentAnswers);

    res.status(200).send({
      status: 'Answer marked successfully..',
      grade: `${grade} / ${quizz.questions.length}`,
    });
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

module.exports = answerQuizzRouter;
//export { router as answerQuizzRouter };
