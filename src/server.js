'use strict';

const express = require('express');
const notFound = require('./error-handler/404.js');
const errors = require('./error-handler/500.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const app = express();

app.use(logger);

app.get('/person', validator, (req, res) => {
  res.status(200).json({name: `${req.query.nameProvided}`});
});

app.use('*', notFound);
app.use(errors); 

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`listening on PORT: ${port}`);
    });
  },
};