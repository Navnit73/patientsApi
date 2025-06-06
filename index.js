const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS for cross-origin request
app.use(cors());

// Middleware to parse JSON b]
app.use(bodyParser.json());

// In-memory storage for tasks data with initial data
let tasksData = {
  items: [
    {
      name: "Dummy Group 1",
      tasks: [
        {
          task_name: "Integrate payment method",
          user: { id: 1, name: "Rajesh Malhotra", initials: "RM" },
          priority: "High",
          status: "",
          due_date: null,
          notes: "This is a note",
          updated_at: null,
          progress: 50,
          selectedUsers: [
            { id: 1, name: "Rajesh Malhotra", initials: "RM" , status: "",},
            { id: 2, name: "Manjit Kaur Bajwa", initials: "MK" ,status: "", },
            { id: 3, name: "Amit Sharma", initials: "AS", status: "", },
          ],
        },
        {
          task_name: "Impliment cart functionality",
          user: { id: 1, name: "Rajesh Malhotra", initials: "RM" },
          priority: "High",
          status: "",
          due_date: null,
          notes: "This is a important",
          updated_at: null,
          progress: 50,
          selectedUsers: [
            { id: 1, name: "Rajesh Malhotra", initials: "RM", status: "", },
            { id: 2, name: "Manjit Kaur Bajwa", initials: "MK", status: "", },
            { id: 3, name: "Amit Sharma", initials: "AS", status: "", },
          ],
        },
      ],
    },
    {
      name: "Dummy Group 2",
      tasks: [
        {
          task_name: "Book a flight ticket from india to usa",
          user: { id: 3, name: "Amit Sharma", initials: "AS" },
          priority: "Low",
          status: "",
          due_date: null,
          notes: "Business class",
          updated_at: null,
          progress: 100,
          selectedUsers: [{ id: 3, name: "Amit Sharma", initials: "AS" }],
        },
        {
          task_name: "Ship the consignment to africa",
          user: { id: 2, name: "Manjit Kaur Bajwa", initials: "MK" },
          priority: "Medium",
          status: "",
          due_date: null,
          notes: "Choose fastest service",
          updated_at: null,
          progress: 30,
          selectedUsers: [
            { id: 1, name: "Rajesh Malhotra", initials: "RM" },
            { id: 2, name: "Manjit Kaur Bajwa", initials: "MK" },
          ],
        },
      ],
    },
    {
      name: "Completed",
      tasks: [ ],
    },
        {
      name: "Pending",
      tasks: [ ],
    },
        {
      name: "In Progress",
      tasks: [ ],
    },
 
  ],
  blankItem: {},
  serialNumberTitle: "Serial Number",
  subtotal: 0,
  total: 10,
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
   newData.items.forEach(group => {
    // Generate group ID if missing
    if (!group.id) group.id = uuidv4();
    
    // Generate task IDs if missing
    group.tasks.forEach(task => {
      if (!task.id) task.id = uuidv4();
    });
  });

  tasksData = newData;
  res.status(201).json({ message: 'Data saved successfully', data: tasksData });

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
