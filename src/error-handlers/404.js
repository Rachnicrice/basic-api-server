'use strict';

function pageNotFound (req, res, next) {
  const errorObj = {
    status: 404,
    message: 'Page not found.',
  };

  res.status(404).send(errorObj);
}

module.exports = pageNotFound;