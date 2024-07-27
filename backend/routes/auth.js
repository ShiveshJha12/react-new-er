const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assuming you have a db.js file to handle the MySQL connection
const router = express.Router();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Set this in your .env file

// Signup Route
router.post('/signup', async (req, res) => {
  console.log('signup h bc!');
  const { username, password } = req.body;
  
  // Check if user already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) return res.status(400).send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('User created');
    });
  });
});

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).send('Invalid username or password');

    const user = results[0];
    
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid username or password');

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  });
});

// Logout Route (Optional: Client-side logic can handle clearing token)
router.post('/logout', (req, res) => {
  // Logout logic can be handled on the client-side (e.g., clearing tokens)
  res.send('Logged out');
});

module.exports = router;
