const { Router } = require('express');
const auth = require('../../middlewares/auth.js');
const teacherAuth = require('../../middlewares/teacherAuth.js');
const Quiz = require('../../models/quiz.js');
const removeQuizzRouter = Router();

removeQuizzRouter.delete(
  '/quizzes/:quizzId',
  auth,
  teacherAuth,
  async (req, res) => {
    try {
      let quizz = await Quiz.findById({
        _id: req.params.quizzId,
      });

      if (req.user._id != quizz.owner.toString()) {
        throw new Error('Error: sorry, this quizz belongs to another teacher');
      }

      quizz = await Quiz.deleteOne({
        _id: req.params.quizzId,
      });

      if (quizz.deletedCount < 1) {
        throw new Error('Error: no quizz found with this id');
      }

      res.status(200).send({ status: 'quizz removed Successfully' });
    } catch (e) {
      res.status(400).send({
        error: e.message,
      });
    }
  }
);

module.exports = removeQuizzRouter;
//export { router as removeQuizzRouter };
