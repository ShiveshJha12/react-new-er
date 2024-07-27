const express = require('express');
const db = require('../db'); // Adjust path as necessary
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// Add Event Route
router.post('/add', authenticateToken, (req, res) => {
  const { name, description, date, location } = req.body;
  const userId = req.userId; // Use logged-in user's ID

  if (!userId) return res.status(401).send('User must be logged in to add events');

  console.log('User ID:', userId); // Debugging line

  db.query(
    'INSERT INTO events (name, description, date, location, user_id) VALUES (?, ?, ?, ?, ?)',
    [name, description, date, location, userId],
    (err, results) => {
      if (err) {
        console.error('Database Error:', err); // Debugging line
        return res.status(500).send('Failed to add event');
      }
      res.status(201).send('Event created'); // Correct use of res.status
    }
  );
});

// Get Events Route
router.get('/eventlist', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
