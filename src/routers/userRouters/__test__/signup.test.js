import request from 'supertest';
import app from '../../../app.js';
import User from '../../../models/user.js';
const { setupDatabase } = require('../../../tests/setup');
jest.setTimeout(30000);

beforeEach(setupDatabase);

test('sign up a new user and saved to database', async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
      job: 'student',
      name: 'ahmed',
    })
    .expect(201);

  // assert user saved in database
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // assert about response
  expect(response.body).toMatchObject({
    user: {
      email: 'test@test.com',
      job: 'student',
      name: 'ahmed',
    },
  });
});

test('it fails when an signup with existing email', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
      job: 'student',
      name: 'ahmed',
    })
    .expect(201);

  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
      job: 'student',
      name: 'ahmed',
    })
    .expect(400);
});

test('it fails when password length < 4', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '123',
      job: 'student',
      name: 'ahmed',
    })
    .expect(400);
});

test('it fails when job not student or teacher', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
      job: 'other',
      name: 'ahmed',
    })
    .expect(400);

  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
      job: 'student',
      name: 'ahmed',
    })
    .expect(201);
});

test('it fails when name does not include', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
      job: 'teacher',
    })
    .expect(400);
});

test('it fails when job does not include', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
      name: 'ahmed',
    })
    .expect(400);
});

test('responds with a cookie when given valid credentials', async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'ahmed',
      job: 'teacher',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
