const request = require('supertest');
const app = require('../app/server');

describe('Contact API', () => {
  it('GET / should return service name', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Acto pide contacto Service');
  });

  it('POST /contact should process valid contact', async () => {
    const res = await request(app)
      .post('/contact')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Hello World'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('id');
  });

  it('POST /contact should return 400 for missing fields', async () => {
    const res = await request(app)
      .post('/contact')
      .send({
        name: 'Test User'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
