const mongoose = require('mongoose');
const answersOptionsSchema = new mongoose.Schema(
  {
    multipleChoice: [
      {
        type: String,
      },
    ],
    shortAnswer: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const correctAnswerOptions = new mongoose.Schema(
  {
    single: {
      type: String,
    },

    multi: [
      {
        type: String,
      },
    ],

    number: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

module.exports = { answersOptionsSchema, correctAnswerOptions };
