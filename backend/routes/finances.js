const express = require('express');
const db = require('../db'); // Adjust path as necessary
const router = express.Router();

// Create Finance Route
router.post('/add', (req, res) => {
  const { type, amount, date, description } = req.body;

  // Insert new finance record
  db.query(
    'INSERT INTO finances (type, amount, date, description) VALUES (?, ?, ?, ?)',
    [type, amount, date, description],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Finance record added');
    }
  );
});

// Get Finances Route
router.get('/', (req, res) => {
  db.query('SELECT * FROM finances', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
