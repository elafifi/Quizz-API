import request from 'supertest';
import app from '../../../app.js';
import Quiz from '../../../models/quiz.js';
import User from '../../../models/user.js';

const {
  setupDatabase,
  studentOne,
  studentTwo,
  teacherOne,
  teacherTwo,
  quizzOne,
  quizzTwo,
} = require('../../../tests/setup');
jest.setTimeout(30000);

beforeEach(setupDatabase);

test('should add question to quizz and get quizz with added question', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: teacherOne.email,
      password: teacherOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const question = {
    title: 'Q2: Choose correct Answer',
    question: 'qs2',
    answers: { multipleChoice: ['a', 'b', 'c', 'b'] },
    answerType: 'single',
    correctAnswer: {
      single: 'b',
    },
  };
  const questionCount = quizzOne.questions.length;
  const response = await request(app)
    .post(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send(question)
    .expect(201);

  expect(response.body.questions.length).toBe(questionCount + 1);
});

test('should fail when not teacher add question', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: studentOne.email,
      password: studentOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const question = {
    title: 'Q2: Choose correct Answer',
    question: 'qs2',
    answers: { multipleChoice: ['a', 'b', 'c', 'b'] },
    answerType: 'single',
    correctAnswer: {
      single: 'b',
    },
  };
  await request(app)
    .post(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send(question)
    .expect(401);
});

test('should fail when teacherTwo add question to teacherOne quizz', async () => {
  const teacherTwo_response = await request(app)
    .post('/signin')
    .send({
      email: teacherTwo.email,
      password: teacherTwo.password,
    })
    .expect(200);

  const cookie = teacherTwo_response.get('set-cookie');

  const question = {
    title: 'Q2: Choose correct Answer',
    question: 'qs2',
    answers: { multipleChoice: ['a', 'b', 'c', 'b'] },
    answerType: 'single',
    correctAnswer: {
      single: 'b',
    },
  };
  await request(app)
    .post(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send(question)
    .expect(400);
});
