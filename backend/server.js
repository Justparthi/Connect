const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send('hii backend connected no worries')
})

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Received data: ${name}, ${age}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
