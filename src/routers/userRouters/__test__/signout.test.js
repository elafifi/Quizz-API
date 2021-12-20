import request from 'supertest';
import app from '../../../app.js';
const { setupDatabase } = require('../../../tests/setup');
jest.setTimeout(30000);

beforeEach(setupDatabase);

test('it fails when not authenticated', async () => {
  await request(app)
    .post('/signout')
    .send({
      email: 'test@test.com',
      password: '123456',
    })
    .expect(401);
});

it('clears the cookie after signing out', async () => {
  const signUp_response = await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      job: 'teacher',
      name: 'mohamed',
    })
    .expect(201);

  const cookie = signUp_response.headers['set-cookie'];
  const response = await request(app)
    .post('/signout')
    .set('cookie', cookie)
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')[0]).toEqual(
    'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
  expect(response.body).toMatchObject({
    message: 'Bye Bye..',
  });
});
