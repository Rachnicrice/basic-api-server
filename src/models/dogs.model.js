'use strict';

const Dogs = (sequelize, DataTypes) => sequelize.define('Dogs', {
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petName: {
    type: DataTypes.STRING,
  },
  isTheGoodestBoi: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Dogs;