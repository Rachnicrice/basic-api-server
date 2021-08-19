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
  
  beforeAll(async () => {
    await db.sync();
  });

  afterAll(async () => {
    await db.drop();
  });

  it('should respond with a 404 there is no route found', async () => {
    await mockRequest.get('/billie_eilish')
      .then(results => {
        expect(results.status).toEqual(404);
      });
  });

  it('should get all the cats', async () => {
    await mockRequest.post('/cat').send(cat)
      .then( results => {
        mockRequest.get('/cats')
          .then(results => {
            expect(results.json).toBeDefined();
            expect(results.status).toEqual(200);
          });
      });
  });

  it('should get one cat', async () => {
    await mockRequest.post('/cat').send(cat)
      .then( results => {
        mockRequest.get(`/cat/${results.id}`)
          .then(results => {
            expect(results.json).toBeDefined();
            expect(results.status).toEqual(200);
          });
      });
  });

  it('should create a new cat', async () => {
    await mockRequest.post('/cat').send(cat)
      .then(results => {
        expect(results.status).toEqual(201);
      });
  });

  it('should update a cat', async () => {
    await mockRequest.post('/cat').send(cat)
      .then( results => {
        mockRequest.put(`/cat/${results.id}`).send({name: 'Mr.Meows-a-lot'})
          .then(results => {
            expect(results.json).toBeDefined();
            expect(results.status).toEqual(202);
          });
      });
  });

  it('should delete a cat', async () => {
    await mockRequest.post('/cat').send(cat)
      .then( results => {
        mockRequest.delete(`/cat/${results.id}`)
          .then(results => {
            expect(results.json).toBeDefined();
            expect(results.status).toEqual(204);
          });
      });
  });

});


describe('Dog Route Testing', () => {

  let dog = {
    breed: 'German Spitz',
    petName: 'Ginger',
    isGoodestBoi: true,
  };

  beforeAll(async () => {
    await db.sync();
    jest.setTimeout(30000);
  });

  afterAll(async () => {
    await db.drop();
  });

  it('should respond with a 404 there is no route found', async () => {
    await mockRequest.get('/unicorns')
      .then(results => {
        expect(results.status).toEqual(404);
      });
  });

  it('should get all the dogs', async () => {
    await mockRequest.post('/dog').send(dog)
      .then( results => {
        mockRequest.get('/dogs')
          .then(results => {
            expect(results.json).toBeDefined();
            expect(results.status).toEqual(200);
          });
      });
  });

  it('should get one dog', async () => {
    await mockRequest.post('/dog').send(dog)
      .then( results => {
        mockRequest.get(`/dog/${results.id}`)
          .then(results => {
            expect(results.json).toBeDefined();
            expect(results.status).toEqual(200);
          });
      });
  });

  it('should create a new dog', async () => {
    return await mockRequest.post('/dog').send(dog)
      .then(results => {
        expect(results.status).toEqual(201);
      });
  });

  it('should update a dog', async () => {

  });

  it('should delete a dog', async () => {

  });

});