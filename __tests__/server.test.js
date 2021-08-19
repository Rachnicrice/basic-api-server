const { server } = require('../src/server.js');
const { db } = require('../src/models/index.js');
const supertest = require('supertest');
const { expect, afterAll } = require('@jest/globals');
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



describe('Cat Route Testing', () => {

  let cat = {
    breed: 'Maincoon',
    petName: 'Snickers',
    isPlottingWorldDomination: true,
  };
  
  beforeEach(async () => {
    await db.sync();
  });

  afterEach(async () => {
    await db.drop();
  });

  it('should respond with a 404 there is no route found', async () => {
    let results = await mockRequest.get('/billie_eilish');
    expect(results.status).toEqual(404);
  });

  it('should get all the cats', async () => {
    await mockRequest.post('/cat').send(cat);
    let getResults = await mockRequest.get('/cats');
    expect(getResults.status).toEqual(200);
  });

  it('should get one cat', async () => {
    let results = await mockRequest.post('/cat').send(cat);
    let oneCat = await mockRequest.get(`/cat/${results.body.id}`);
    expect(oneCat.status).toEqual(200);
  });

  it('should create a new cat', async () => {
    let results = await mockRequest.post('/cat').send(cat);
    expect(results.status).toEqual(201);
  });

  it('should update a cat', async () => {
    let results = await mockRequest.post('/cat').send(cat);
    let updateResults = await mockRequest.put(`/cat/${results.body.id}`).send({name: 'Mr.Meows-a-lot'});
    expect(updateResults.status).toEqual(202);
  });

  it('should delete a cat', async () => {
    let results = await mockRequest.post('/cat').send(cat);
    let delResults = await mockRequest.delete(`/cat/${results.body.id}`);
    expect(delResults.status).toEqual(204);
  });

});


describe('Dog Route Testing', () => {

  let dog = {
    breed: 'German Spitz',
    petName: 'Ginger',
    isGoodestBoi: true,
  };

  beforeEach(async () => {
    await db.sync();
  });

  afterEach(async () => {
    await db.drop();
  });

  it('should respond with a 404 there is no route found', async () => {
    let results = await mockRequest.get('/unicorn');
    expect(results.status).toEqual(404);
  });

  it('should get all the dogs', async () => {
    await mockRequest.post('/dog').send(dog);
    let results = await mockRequest.get('/dogs');
    expect(results.status).toEqual(200);
  });

  it('should get one dog', async () => {
    let results = await mockRequest.post('/dog').send(dog);
    let oneDog = await mockRequest.get(`/dog/${results.body.id}`);
    expect(oneDog.status).toEqual(200);
  });

  it('should create a new dog', async () => {
    let results = await mockRequest.post('/dog').send(dog);
    expect(results.status).toEqual(201);
  });

  it('should update a dog', async () => {
    let results = await mockRequest.post('/dog').send(dog);
    let updateResults = await mockRequest.put(`/dog/${results.body.id}`).send({name: 'Gingerooo'});
    expect(updateResults.status).toEqual(202);
  });

  it('should delete a dog', async () => {
    let results = await mockRequest.post('/dog').send(dog);
    let delResults = await mockRequest.delete(`/dog/${results.body.id}`);
    expect(delResults.status).toEqual(204);
  });

});