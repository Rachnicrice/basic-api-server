'use strict';

const validator = (req, res, next) => {
  if(req.query.nameProvided) {
    console.log(`${req.query.nameProvided}`);
    next();
  } else {
    console.log('no name in query string');
    next('name not provided in query string');
  }
};

module.exports = validator;