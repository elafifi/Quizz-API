const { Router } = require('express');
const auth = require('../../middlewares/auth.js');
const teacherAuth = require('../../middlewares/teacherAuth.js');
const Quiz = require('../../models/quiz.js');
const removeQuestionRouter = Router();

removeQuestionRouter.delete(
  '/quizzes/:quizzId/:questionId',
  auth,
  teacherAuth,
  async (req, res) => {
    try {
      const [quizz] = await Quiz.find({
        _id: req.params.quizzId,
      });

      if (!quizz) {
        throw new Error('Error: no quizzes found with this title');
      }

      if (req.user._id != quizz.owner.toString()) {
        throw new Error('Error: sorry, this quizz belongs to another teacher');
      }

      const updatedQuestions = quizz.questions.filter((q) => {
        return q._id != req.params.questionId;
      });

      if (updatedQuestions.length < quizz.questions.length) {
        quizz.questions = updatedQuestions;
        await quizz.save();
        res
          .status(200)
          .send({ status: 'question removed Successfully', quizz });
      } else {
        throw new Error('no Question found with this id');
      }
    } catch (e) {
      res.status(400).send({
        error: e.message,
      });
    }
  }
);

module.exports = removeQuestionRouter;
//export { router as removeQuestionRouter };
