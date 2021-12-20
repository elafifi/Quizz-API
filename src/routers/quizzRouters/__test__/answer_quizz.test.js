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

test('should add answer to quizz and get grade', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: studentOne.email,
      password: studentOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const quizz = await Quiz.findById(quizzOne._id);
  const quizzOneAnswer = {
    _id: `${quizzOne._id}`,
    answers: {},
  };
  quizzOneAnswer.answers[quizz.questions[0]._id] = {
    answer: 'b',
  };

  const response = await request(app)
    .post(`/quizzes/${quizzOne._id}/answer`)
    .set('Cookie', cookie)
    .send(quizzOneAnswer)
    .expect(200);

  expect(response.body.grade).toBe(`1 / 1`);
});
