'use strict';

const express = require('express');
const { Dogs } = require('../models/index.js');

const dogRoutes = express.Router();


dogRoutes.get('/dogs', getAllDogs);
dogRoutes.get('/dog/:id', getOneDog);
dogRoutes.post('/dog', createDog);
dogRoutes.put('/dog/:id', updateDog);
dogRoutes.delete('/dog/:id', deleteDog);

async function getAllDogs (req, res) {
  try {
    let allDogs = await Dogs.findAll();
    res.status(200).json(allDogs);
  } catch (err) {
    throw new Error(err);
  }
}

async function getOneDog (req, res) {
  const id = parseInt(req.params.id);

  try {
    let oneDog = await Dogs.findOne( {where: {id: id}} );
    res.status(200).json(oneDog);
  } catch (err) {
    throw new Error(err);
  }
}

async function createDog (req, res) {
  try {
    let newDog = await Dogs.create(req.body);
    res.status(201).json(newDog);
  } catch (err) {
    throw new Error(err);
  }
}

async function updateDog (req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    let dogToBeUpdated = await Dogs.findOne( {where: {id: id}});
    let updatedDog = await dogToBeUpdated.update(data);
    res.status(202).json(updatedDog);
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteDog (req, res) {
  const id = parseInt(req.params.id);

  try {
    let deletedDog = await Dogs.destroy( {where: {id: id}});
    res.status(204).json(deletedDog);
  } catch (err) {
    console.log(`You can't delete a dog... monster...`);
    throw new Error(err);
  }
}

module.exports = dogRoutes;
