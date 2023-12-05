const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

router.use(bodyParser.json());
router.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);



db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Create a table to store user favorite restaurants
db.query(`CREATE TABLE IF NOT EXISTS 'LASTCALLDB'.'favorites' (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  restaurant_id VARCHAR(255)
)`, (err, result) => {
  if (err) {
    console.error('Error creating the favorites table: ' + err);
  }
  console.log('favorites table is ready.');
});

// Endpoint to add a restaurant to the user's favorites
router.post('/addFavoriteRestaurant', (req, res) => {
  const { restaurant_name } = req.body;
  const customer_id = req.session.user_id; // Assuming you have a user authentication mechanism

  if (!customer_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Insert the restaurant into the user's favorites
  db.query('INSERT INTO favorites (customer_id, restaurant_name) VALUES (?, ?)', [customer_id, restaurant_name], (err, result) => {
    if (err) {
      console.error('Error adding the restaurant to favorites: ' + err);
      res.status(500).json({ error: 'Failed to add the restaurant to favorites' });
    } else {
      res.status(200).json({ message: 'Restaurant added to favorites' });
    }
  });
});

// Endpoint to retrieve the user's favorite restaurants
router.get('/getFavoriteRestaurants', (req, res) => {
  const customer_id = req.session.customer_id; // Assuming you have a user authentication mechanism

  if (!customer_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.query('SELECT restaurant_name FROM favorites WHERE customer_id = ?', customer_id, (err, rows) => {
    if (err) {
      console.error('Error retrieving the user favorites: ' + err);
      res.status(500).json({ error: 'Failed to retrieve the user favorites' });
    } else {
      const favorites = rows.map((row) => row.restaurant_name);
      res.status(200).json({ favorites });
    }
  });
});

router.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
