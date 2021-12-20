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

test('should remove question with id and get response', async () => {
  const signIn_response = await request(app)
    .post('/signin')
    .send({
      email: teacherOne.email,
      password: teacherOne.password,
    })
    .expect(200);

  const cookie = signIn_response.get('set-cookie');

  const quizz = await Quiz.findById({ _id: quizzOne._id });

  const quesionsCount = quizz.questions.length;

  const response = await request(app)
    .delete(`/quizzes/${quizzOne._id}/${quizz.questions[0]._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.quizz.questions.length).toBe(quesionsCount - 1);
});

test('should fail when teacherOne remove question for quizz belongs to teacherTwo', async () => {
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
    .delete(`/quizzes/${quizzOne._id}/${quizz.questions[0]._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});

test('should fail when student remove question ', async () => {
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
    .delete(`/quizzes/${quizzOne._id}/${quizz.questions[0]._id}`)
    .set('Cookie', cookie)
    .send()
    .expect(401);
});
