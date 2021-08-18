'use strict';

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');
const cats = require('./cats.js');
const dogs = require('./dogs.js');


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
  db: sequelize,
  Clothes: cats(sequelize, DataTypes),
  Food: dogs(sequelize, DataTypes),
};