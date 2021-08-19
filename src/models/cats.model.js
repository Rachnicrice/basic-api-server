'use strict';

const Cats = (sequelize, DataTypes) => sequelize.define('Cats', {
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petName: {
    type: DataTypes.STRING,
  },
  isPlottingWorldDomination: { 
    type: DataTypes.BOOLEAN, 
  },
});

module.exports = Cats;