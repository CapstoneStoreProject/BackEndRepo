const express = require('express');
const router = express.Router();
const { getAllCats, getCatById, deleteCatById } = require('../db/models/cat.js');
// const { requireUser } = require('./utils');