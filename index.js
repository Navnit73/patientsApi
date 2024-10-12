const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS for cross-origin requests
app.use(cors());

// Hardcoded patient data
const patients = [
  { name: "Suresh Kumar", age: 58, uhid: "0000000001", gender: "Male", patientImage: "https://i.pravatar.cc/150?img=1" },
  { name: "Rajesh Gupta", age: 47, uhid: "0000000002", gender: "Male", patientImage: "https://i.pravatar.cc/150?img=2" },
  { name: "Meena Devi", age: 65, uhid: "0000000003", gender: "Female", patientImage: "https://i.pravatar.cc/150?img=3" },
  { name: "Amit Verma", age: 32, uhid: "0000000004", gender: "Male", patientImage: "https://i.pravatar.cc/150?img=4" },
  { name: "Pooja Sharma", age: 28, uhid: "0000000005", gender: "Female", patientImage: "https://i.pravatar.cc/150?img=5" },
  { name: "Vikas Mehta", age: 38, uhid: "0000000006", gender: "Male", patientImage: "https://i.pravatar.cc/150?img=6" },
  { name: "Sunita Rao", age: 54, uhid: "0000000007", gender: "Female", patientImage: "https://i.pravatar.cc/150?img=7" },
  { name: "Manoj Tiwari", age: 49, uhid: "0000000008", gender: "Male", patientImage: "https://i.pravatar.cc/150?img=8" },
  { name: "Rita Singh", age: 44, uhid: "0000000009", gender: "Female", patientImage: "https://i.pravatar.cc/150?img=9" },
  { name: "Deepak Joshi", age: 35, uhid: "0000000010", gender: "Male", patientImage: "https://i.pravatar.cc/150?img=10" },
  // Add more patients here up to 100
];

// Endpoint to get all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
