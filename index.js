const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for tasks data
let tasksData = {
  items: [],
  blankItem: {},
  serialNumberTitle: "Serial Number",
  subtotal: 0,
  total: 0
};

// Endpoint to get all tasks data
app.get('/api/tasks', (req, res) => {
  const { user_id, hco_id } = req.query;
  if (user_id && hco_id) {
    // Filter tasksData based on user_id and hco_id if needed
    // For now, we'll just return the tasksData
    res.json(tasksData);
  } else {
    res.status(400).json({ error: 'user_id and hco_id are required' });
  }
});

// Endpoint to save tasks data
app.post('/api/tasks', (req, res) => {
  const newData = req.body;
  tasksData = newData;
  res.status(201).json({ message: 'Data saved successfully', data: tasksData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
