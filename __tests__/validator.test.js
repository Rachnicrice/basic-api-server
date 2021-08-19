'use strict';

const validator = require('../src/middleware/validator.js');

describe('testing validator mw:', () => {
  let consoleSpy;
  let req = {
    query: {
      nameProvided: 'testName',
    },
  };
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log something', () => {
    validator(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

});