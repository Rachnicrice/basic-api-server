'use strict';

const express = require('express');
const { Cats } = require('../models/index.js');

const catRoutes = express.Router();

catRoutes.get('/cats', getAllCats);
catRoutes.get('/cat/:id', getOneCat);
catRoutes.post('/cat', createCat);
catRoutes.put('/cat/:id', updateCat);
catRoutes.delete('/cat/:id', deleteCat);

async function getAllCats (req, res) {
  try {
    let allCats = await Cats.findAll();
    res.status(200).json(allCats);
  } catch (err) {
    throw new Error(err);
  }
}

async function getOneCat (req, res) {
  const id = parseInt(req.params.id);

  try {
    let oneCat = await Cats.findOne( {where: {id: id}} );
    res.status(200).json(oneCat);
  } catch (err) {
    throw new Error(err);
  }
}

async function createCat (req, res) {
  try {
    let newCat = await Cats.create(req.body);
    res.status(201).json(newCat);
  } catch (err) {
    throw new Error(err);
  }
}

async function updateCat (req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    let catToBeUpdated = await Cats.findOne( {where: {id: id}});
    let updatedCat = await catToBeUpdated.update(data);
    res.status(202).json(updatedCat);
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteCat (req, res) {
  const id = parseInt(req.params.id);

  try {
    let deletedCat = await Cats.destroy( {where: {id: id}});
    res.status(204).json(deletedCat);
  } catch (err) {
    console.log(`Cat cannot be destroyed: 8 lives left`);
    throw new Error(err);
  }
}

module.exports = catRoutes;