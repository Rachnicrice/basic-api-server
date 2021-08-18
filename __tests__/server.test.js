const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('Server API Testing:', () => {

  it('sends 404 error on bad route', async () => {
    return await mockRequest.get('/this-is-not-a-real-route')
      .then(result => {
        expect(result.status).toEqual(404);
      });
  });

  it('sends 500 if no name is in the query string', async () => {
    return await mockRequest.get('/person')
      .then(result => {
        expect(result.status).toEqual(500);
      });

  });

  it('sends 200 on good request w/ name in query string', async () => {
    return await mockRequest.get('/person?nameProvided=eragon')
      .then(result => {
        expect(result.status).toEqual(200);
      });
  });
});