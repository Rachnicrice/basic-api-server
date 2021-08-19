'use strict';

const express = require('express');
const dogRoutes = require('./routes/dogs.js');
const catRoutes = require('./routes/cats.js');
const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const cors = require('cors');
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(dogRoutes);
app.use(catRoutes);

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