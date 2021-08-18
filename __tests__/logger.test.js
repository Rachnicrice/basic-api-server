'use strict';

const logger = require('../src/middleware/logger.js');

describe('testing logger mw:', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log something', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
});