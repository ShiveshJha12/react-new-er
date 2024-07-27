const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const authRouter = require('../routes/auth');
const event = require('../routes/events');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});


app.use('/auth', authRouter);
app.use('/events', event);




app.get('/', (req, res) => {
  res.send('ERP Software API');
});




app.get('/events', (req, res) => {
db.query('SELECT * FROM events', (err, results) => {
    if (err) throw err;
    res.json(results);
});
// res.send('ERP Software API');
});
  
app.get('/finances', (req, res) => {
db.query('SELECT * FROM finances', (err, results) => {
    if (err) throw err;
    res.json(results);
});
});

const authenticateToken = require('../middleware/authMiddleware');

// Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});


// app.use('/api/auth', authRouter);
  
