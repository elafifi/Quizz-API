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

test('should list all quizzes', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: studentOne.email,
      password: studentOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const response = await request(app)
    .get(`/quizzes`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test('should fail when not authorized one list all quizzes', async () => {
  const response = await request(app).get(`/quizzes`).send().expect(401);
});
