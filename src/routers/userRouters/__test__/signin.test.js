import request from 'supertest';
import app from '../../../app.js';
import User from '../../../models/user.js';
const { setupDatabase } = require('../../../tests/setup');
jest.setTimeout(30000);

beforeEach(setupDatabase);
test('fails when a email that does not exist is supplied', async function () {
  await request(app)
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

test('it fails when an incorrect password is supplied', async () => {
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
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: '12345',
    })
    .expect(400);
});

test('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'ahmed',
      job: 'teacher',
    })
    .expect(201);

  const response = await request(app)
    .post('/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
