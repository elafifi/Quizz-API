const mongoose = require('mongoose');
const {
  answersOptionsSchema,
  correctAnswerOptions,
} = require('./answer-options.js');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      title: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      answers: {
        type: answersOptionsSchema,
        required: true,
      },
      answerType: {
        type: String,
        enum: ['shortText', 'single', 'multi', 'number'],
        required: true,
      },
      correctAnswer: {
        type: correctAnswerOptions,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

quizSchema.methods.toJSON = function () {
  const quizz = this.toObject();
  try {
    quizz.questions = quizz.questions.map((q) => {
      if (q.answerType === 'shortText' || q.answerType === 'number') {
        delete q.answers.multipleChoice;
        delete q.correctAnswer.multi;
      }

      if (q.answerType === 'single') {
        delete q.correctAnswer.multi;
      }
      return q;
    });
  } catch (e) {
    console.log(e.message);
  }

  return quizz;
};
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
//export { Quiz };
