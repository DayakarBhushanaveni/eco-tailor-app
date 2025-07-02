const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

// Get all materials
router.get('/', async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
});

// Add a new material
router.post('/', async (req, res) => {
  const material = new Material(req.body);
  await material.save();
  res.json(material);
});

module.exports = router;