const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Coupons data
const coupons = [
  { name: "OPDFREE", discount_percent: 100, discount_amount: 0, group_id: [] },
  { name: "LAB50", discount_percent: 50, discount_amount: 0, group_id: [1] },
  { name: "NEWPT", discount_percent: 0, discount_amount: 40, group_id: [] },
];

// Endpoint to validate a coupon code
app.post("/api/validate-coupon", (req, res) => {
  const { couponCode } = req.body;
  const coupon = coupons.find((c) => c.name === couponCode);

  if (coupon) {
    res.json({ valid: true, message: "Coupon is valid" });
  } else {
    res.status(404).json({ valid: false, error: "Invalid coupon code" });
  }
});

// Endpoint to apply a coupon code and return its details
app.post("/api/apply-coupon", (req, res) => {
  const { couponCode } = req.body;
  const coupon = coupons.find((c) => c.name === couponCode);

  if (coupon) {
    res.json({
      coupon,
      message: "Coupon applied successfully",
    });
  } else {
    res.status(404).json({ error: "Invalid coupon code" });
  }
});

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
            { id: 1, name: "Rajesh Malhotra", initials: "RM", status: "" },
            { id: 2, name: "Manjit Kaur Bajwa", initials: "MK", status: "" },
            { id: 3, name: "Amit Sharma", initials: "AS", status: "" },
          ],
        },
        {
          task_name: "Implement cart functionality",
          user: { id: 1, name: "Rajesh Malhotra", initials: "RM" },
          priority: "High",
          status: "",
          due_date: null,
          notes: "This is important",
          updated_at: null,
          progress: 50,
          selectedUsers: [
            { id: 1, name: "Rajesh Malhotra", initials: "RM", status: "" },
            { id: 2, name: "Manjit Kaur Bajwa", initials: "MK", status: "" },
            { id: 3, name: "Amit Sharma", initials: "AS", status: "" },
          ],
        },
      ],
    },
    // Additional groups omitted for brevity
  ],
  subtotal: 0,
  total: 10,
};

// Endpoint to get all tasks data
app.get("/api/tasks", (req, res) => {
  const { user_id, hco_id } = req.query;
  if (user_id && hco_id) {
    // Filter tasksData based on user_id and hco_id if needed
    res.json(tasksData);
  } else {
    res.status(400).json({ error: "user_id and hco_id are required" });
  }
});

// Endpoint to save tasks data
app.post("/api/tasks", (req, res) => {
  const newData = req.body;
  tasksData = newData;
  res.status(201).json({ message: "Data saved successfully", data: tasksData });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
