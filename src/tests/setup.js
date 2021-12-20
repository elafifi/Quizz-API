const Quiz = require('../models/quiz');
const User = require('../models/user');
const mongoose = require('mongoose');

const studentOneId = new mongoose.Types.ObjectId();
const studentOne = {
  _id: studentOneId,
  email: 'student1@test.com',
  password: 'password',
  job: 'student',
  name: 'student1',
};

const studentTwoId = new mongoose.Types.ObjectId();
const studentTwo = {
  _id: studentTwoId,
  email: 'student2@test.com',
  password: 'password',
  job: 'student',
  name: 'student2',
};

const teacherOneId = new mongoose.Types.ObjectId();
const teacherOne = {
  _id: teacherOneId,
  email: 'teacher1@test.com',
  password: 'password',
  job: 'teacher',
  name: 'teacher1',
};

const teacherTwoId = new mongoose.Types.ObjectId();
const teacherTwo = {
  _id: teacherTwoId,
  email: 'teacher2@test.com',
  password: 'password',
  job: 'teacher',
  name: 'teacher2',
};

const quizzOneId = new mongoose.Types.ObjectId();
const quizzOne = {
  _id: quizzOneId,
  title: 'quizzOne',
  questions: [
    {
      title: 'Q1: Choose correct Answer',
      question: 'qs1',
      answers: { multipleChoice: ['a', 'b', 'c', 'b'] },
      answerType: 'single',
      correctAnswer: {
        single: 'b',
      },
    },
  ],
  owner: teacherOneId,
};

const quizzTwoId = new mongoose.Types.ObjectId();
const quizzTwo = {
  _id: quizzTwoId,
  title: 'quizzTwo',
  questions: [
    {
      title: 'Q1: Choose correct Answer',
      question: 'qs1',
      answers: { multipleChoice: ['a', 'b', 'c', 'b'] },
      answerType: 'single',
      correctAnswer: {
        single: 'b',
      },
    },
  ],
  owner: teacherTwoId,
};

const setupDatabase = async () => {
  try {
    await User.deleteMany();
    await Quiz.deleteMany();

    await new User(teacherOne).save();
    await new User(teacherTwo).save();

    await new User(studentOne).save();
    await new User(studentTwo).save();

    await new Quiz(quizzOne).save();
    await new Quiz(quizzTwo).save();
  } catch (e) {
    console.log('error Here: ', e);
    throw new Error('error in setup test', e);
  }
};
module.exports = {
  setupDatabase,
  studentOne,
  studentTwo,
  teacherOne,
  teacherTwo,
  quizzOne,
  quizzTwo,
};
