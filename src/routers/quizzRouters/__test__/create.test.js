import request from 'supertest';
import app from '../../../app.js';
import Quiz from '../../../models/quiz.js';
const { setupDatabase } = require('../../../tests/setup');
jest.setTimeout(30000);

beforeEach(setupDatabase);

test('create new question and get response', async () => {
  const signUp_response = await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      job: 'teacher',
      name: 'mohamed',
    })
    .expect(201);

  const cookie = signUp_response.get('set-cookie');

  const quizz = {
    title: 'science',
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
      {
        title: 'Q2: ',
        question: 'What is ...',
        answers: { shortAnswer: '---' },
        answerType: 'single',
        correctAnswer: {
          single: 'egypt',
        },
      },
      {
        title: 'Q3:state result ',
        question: '3+4=',
        answers: { shortAnswer: '---' },
        answerType: 'number',
        correctAnswer: {
          number: 5,
        },
      },
      {
        title: 'Q4:  ',
        question: 'what is the correct sentences',
        answers: { multipleChoice: ['a', 'b', 'c', 'd'] },
        answerType: 'multi',
        correctAnswer: {
          multi: ['b', 'c'],
        },
      },
    ],
  };

  const response = await request(app)
    .post('/quizzes/create')
    .set('Cookie', cookie)
    .send(quizz)
    .expect(201);

  // assert that quizz is saved in database
  const targetQuizz = await Quiz.findById(response.body._id);
  expect(targetQuizz).not.toBeNull();

  // assert that quizz owner is signup user
  const user = signUp_response.body.user;
  expect(targetQuizz.owner.toString()).toEqual(user._id);
});

test('should fail when one not teacher create question', async () => {
  const signUp_response = await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      job: 'student',
      name: 'mohamed',
    })
    .expect(201);

  const cookie = signUp_response.get('set-cookie');

  const quizz = {
    title: 'science',
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
  };

  const response = await request(app)
    .post('/quizzes/create')
    .set('Cookie', cookie)
    .send(quizz)
    .expect(401);
});
