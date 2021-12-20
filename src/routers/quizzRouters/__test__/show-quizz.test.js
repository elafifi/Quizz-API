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

test('should show quizz without correct answers for student', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: studentOne.email,
      password: studentOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const response = await request(app)
    .get(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.questions[0].title).toBeDefined();
  expect(response.body.questions[0].question).toBeDefined();
  expect(response.body.questions[0].answers).toBeDefined();
  expect(response.body.questions[0]._id).toBeDefined();
  expect(response.body.questions[0].correctAnswer).not.toBeDefined();
});

test('should show quizz with correct answers for the owner', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: teacherOne.email,
      password: teacherOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const response = await request(app)
    .get(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.questions[0].title).toBeDefined();
  expect(response.body.questions[0].question).toBeDefined();
  expect(response.body.questions[0].answers).toBeDefined();
  expect(response.body.questions[0]._id).toBeDefined();
  expect(response.body.questions[0].correctAnswer).toBeDefined();
});

test('should show quizz without correct answers for the teacher not owner', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: teacherTwo.email,
      password: teacherTwo.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const response = await request(app)
    .get(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.questions[0].title).toBeDefined();
  expect(response.body.questions[0].question).toBeDefined();
  expect(response.body.questions[0].answers).toBeDefined();
  expect(response.body.questions[0]._id).toBeDefined();
  expect(response.body.questions[0].correctAnswer).not.toBeDefined();
});
