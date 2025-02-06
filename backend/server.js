const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();


const cors = require('cors');


const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Parthi'
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connection successful');
  release(); 
});


const app = express();
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:1573', // Your React app's URL
  credentials: true
}));

app.get("/", (req,res) => {
    res.send('hii backend connected no worries')
})

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/data', (req, res) => {
  const { name, email, password } = req.body;
  res.json({ message: `Received data: ${name}, ${email}, ${password}` });
});


// User Registration
app.post('/api/register', async (req, res) => {
  console.log('Received registration request:', req.body);
  
  try {
    const { email, password, name } = req.body;
    
    // Detailed validation
    if (!email || !password || !name) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // More robust email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *', 
      [email, hashedPassword, name]
    );

    console.log('User registered successfully');
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error('Full registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// User Login
app.post('/api/login', async (req, res) => {

  const { email, password } = req.body;
  res.json({ message: `Received data: ${email}, ${password}` });
  console.log('Login request received:', req.body);



  // try {
  //   const { email, password } = req.body;
    
  //   // Find user
  //   const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  //   if (result.rows.length === 0) {
  //     return res.status(400).json({ message: 'Invalid credentials' });
  //   }

  //   // Check password
  //   const user = result.rows[0];
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(400).json({ message: 'Invalid credentials' });
  //   }

  //   // Create token
  //   const token = jwt.sign(
  //     { userId: user.id, email: user.email }, 
  //     'YOUR_SECRET_KEY', 
  //     { expiresIn: '1h' }
  //   );

  //   res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error', error: error.message });
  // }
});

// Update Profile
app.put('/api/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, skills, courses } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2, skills = $3, courses = $4 WHERE id = $5 RETURNING *',
      [name, phone, JSON.stringify(skills), JSON.stringify(courses), id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
