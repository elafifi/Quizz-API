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

test('should remove quizz with id and get response', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: teacherOne.email,
      password: teacherOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const response = await request(app)
    .delete(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const quizz = await Quiz.findById({ _id: quizzOne._id });
  expect(quizz).toBeNull();
});

test('should fail when teacherOne remove quizz belongs to teacherTwo', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: teacherTwo.email,
      password: teacherTwo.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const quizz = await Quiz.findById({ _id: quizzOne._id });

  await request(app)
    .delete(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});

test('should fail when student remove quizz ', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: studentOne.email,
      password: studentOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const quizz = await Quiz.findById({ _id: quizzOne._id });

  await request(app)
    .delete(`/quizzes/${quizzOne._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(401);
});
